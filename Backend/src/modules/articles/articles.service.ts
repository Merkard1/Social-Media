import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from '@/modules/articles/entities/article.entity';
import { User } from '@/modules/users/entities/user.entity';
import { S3 } from 'aws-sdk';
import { ImageService } from '@/common/services/image.service';
import { BlockDto } from './dto/article-block.dto';

@Injectable()
export class ArticlesService {
  private s3: S3;
  private readonly logger = new Logger(ArticlesService.name);

  constructor(
    @InjectRepository(Article)
    private readonly articlesRepo: Repository<Article>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly imageService: ImageService,
  ) {}

  async createArticleWithImages(
    createArticleDto: CreateArticleDto,
    userId: string,
    files: {
      image?: Express.MulterS3File[];
      blockImages?: Express.MulterS3File[];
    },
  ): Promise<Article> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    let mainImageUrl: string | null = null;
    if (files.image && files.image[0]) {
      mainImageUrl = await this.imageService.uploadImage(files.image[0]);
    }

    const blocks = await this.processBlockImages(
      createArticleDto.blocks,
      files.blockImages,
    );

    const article = this.articlesRepo.create({
      title: createArticleDto.title,
      subtitle: createArticleDto.subtitle,
      image: mainImageUrl,
      type: createArticleDto.type,
      blocks,
      user,
    });

    return this.articlesRepo.save(article);
  }

  async updateArticleWithImages(
    articleId: string,
    updateArticleDto: UpdateArticleDto,
    files: {
      image?: Express.MulterS3File[];
      blockImages?: Express.MulterS3File[];
    },
  ): Promise<Article> {
    const article = await this.articlesRepo.findOne({
      where: { id: articleId },
    });
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    // Handle main image replacement
    if (files.image && files.image[0]) {
      const newImageUrl = await this.imageService.uploadImage(files.image[0]);
      if (article.image && article.image !== newImageUrl) {
        await this.imageService.deleteImageFromS3(article.image);
      }
      updateArticleDto.image = newImageUrl;
    }

    // Process block images
    const newBlocks = updateArticleDto.blocks
      ? await this.processBlockImages(
          updateArticleDto.blocks,
          files.blockImages,
          article.blocks,
        )
      : article.blocks;

    Object.assign(article, { ...updateArticleDto, blocks: newBlocks });
    await this.articlesRepo.save(article);

    const updatedArticle = await this.articlesRepo.findOne({
      where: { id: articleId },
      relations: ['user', 'comments', 'ratings'],
    });
    if (!updatedArticle) {
      throw new NotFoundException('Article not found after update');
    }

    return updatedArticle;
  }

  private async processBlockImages(
    blocks: BlockDto[],
    blockFiles?: Express.MulterS3File[],
    oldBlocks?: BlockDto[],
  ): Promise<BlockDto[]> {
    if (!blocks) return [];

    // Map block image placeholders to actual files
    // Suppose the frontend sets `src: 'BLOCK_IMAGE_0'` to indicate that the first uploaded block image corresponds here.
    // `blockFiles` order must match the placeholder indexes.
    // Example: If block.src = "BLOCK_IMAGE_0" then it corresponds to blockFiles[0].

    const updatedBlocks: BlockDto[] = [];
    for (let i = 0; i < blocks.length; i++) {
      const block = { ...blocks[i] };
      if (block.type === 'IMAGE') {
        // If block.src looks like BLOCK_IMAGE_x
        const match = block.src ? block.src.match(/^BLOCK_IMAGE_(\d+)$/) : null;
        if (match && blockFiles) {
          const index = parseInt(match[1], 10);
          const file = blockFiles[index];
          if (file) {
            const newImageUrl = await this.imageService.uploadImage(file);

            // Delete old image if existed
            if (
              oldBlocks &&
              oldBlocks[i] &&
              oldBlocks[i].src &&
              oldBlocks[i].src !== newImageUrl
            ) {
              await this.imageService.deleteImageFromS3(oldBlocks[i].src);
            }

            block.src = newImageUrl;
          } else {
            // If no file provided for an IMAGE block that expects it, decide what to do:
            // Either throw an error or leave src as is.
            // For now, leave it as is or set to null if required.
          }
        } else {
          // If block is IMAGE but no placeholder found, maybe user passed a direct URL?
          // You can validate here. If oldBlocks exist and block did not change src, keep old image.
          // If block changed from an old URL to no URL, delete old image.
          if (
            oldBlocks &&
            oldBlocks[i] &&
            oldBlocks[i].src &&
            oldBlocks[i].src !== block.src
          ) {
            // If old block had an image and new block src changed or removed:
            await this.imageService.deleteImageFromS3(oldBlocks[i].src || '');
          }
        }
      }
      updatedBlocks.push(block);
    }

    return updatedBlocks;
  }

  async create(
    createArticleDto: CreateArticleDto,
    userId: string,
  ): Promise<Article> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const article = this.articlesRepo.create({
      title: createArticleDto.title,
      subtitle: createArticleDto.subtitle,
      image: createArticleDto.image ?? null,
      type: createArticleDto.type,
      blocks: createArticleDto.blocks,
      user,
    });

    return this.articlesRepo.save(article);
  }

  async findAll(query: any): Promise<Article[]> {
    const {
      _limit = 10,
      _page = 1,
      _sort = 'createdAt',
      _order = 'DESC',
      _type = 'ALL',
      q,
    } = query;

    const skip = (_page - 1) * _limit;
    const take = Number(_limit);

    const validSortFields = ['views', 'createdAt', 'title'];
    const sortField = validSortFields.includes(_sort) ? _sort : 'createdAt';
    const sortOrder = _order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const queryBuilder: SelectQueryBuilder<Article> = this.articlesRepo
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.user', 'user');

    if (_type && _type.toUpperCase() !== 'ALL') {
      queryBuilder.andWhere(':type = ANY (article.type)', { type: _type });
    }

    if (q) {
      queryBuilder.andWhere(
        '(article.title ILIKE :q OR article.subtitle ILIKE :q)',
        { q: `%${q}%` },
      );
    }

    queryBuilder.orderBy(`article.${sortField}`, sortOrder as 'ASC' | 'DESC');
    queryBuilder.skip(skip).take(take);

    return queryBuilder.getMany();
  }

  async findOneById(id: string): Promise<Article> {
    const article = await this.articlesRepo.findOne({
      where: { id },
      relations: ['user', 'comments', 'ratings'],
    });
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    article.views += 1;
    await this.articlesRepo.save(article);

    return article;
  }

  async update(
    articleId: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const article = await this.articlesRepo.findOne({
      where: { id: articleId },
    });
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    if (updateArticleDto.image && updateArticleDto.image !== article.image) {
      if (article.image) {
        await this.imageService.deleteImageFromS3(article.image);
      }
    }

    Object.assign(article, updateArticleDto);

    await this.articlesRepo.save(article);

    const updatedArticle = await this.articlesRepo.findOne({
      where: { id: articleId },
      relations: ['user', 'comments', 'ratings'],
    });

    if (!updatedArticle) {
      throw new NotFoundException('Article not found after update');
    }

    return updatedArticle;
  }

  async setImage(articleId: string, imageUrl: string | null): Promise<Article> {
    const article = await this.articlesRepo.findOne({
      where: { id: articleId },
    });
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    if (imageUrl === null && article.image) {
      await this.imageService.deleteImageFromS3(article.image);
    }

    article.image = imageUrl;
    return this.articlesRepo.save(article);
  }

  async remove(articleId: string): Promise<void> {
    const article = await this.articlesRepo.findOne({
      where: { id: articleId },
    });
    if (article) {
      if (article.image) {
        await this.imageService.deleteImageFromS3(article.image);
      }
      for (const block of article.blocks) {
        if (block.type === 'IMAGE' && block.src) {
          await this.imageService.deleteImageFromS3(block.src);
        }
      }
    }

    await this.articlesRepo.delete(articleId);
  }
}
