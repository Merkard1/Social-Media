import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from '@/modules/users/entities/user.entity';
import { Profile } from './entities/profile.entity';


@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(
    userId: string,
    createProfileDto: CreateProfileDto,
  ): Promise<Profile> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.profile) {
      throw new BadRequestException('Profile already exists for this user');
    }

    const profile = this.profilesRepository.create(createProfileDto);
    user.profile = profile;

    await this.usersRepository.save(user);

    return profile;
  }

  async findByUsername(username: string): Promise<Profile> {
    const user = await this.usersRepository.findOne({
      where: { username },
      relations: ['profile'],
    });
    if (!user || !user.profile) {
      throw new NotFoundException(`Profile for user ${username} not found`);
    }
    return user.profile;
  }

  async findByUserId(id: string): Promise<Profile> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!user || !user.profile) {
      throw new NotFoundException(`Profile with id ${id} not found`);
    }
    return user.profile;
  }

  async updateById(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const profile = await this.profilesRepository.findOne({
      where: { id },
    });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    Object.assign(profile, updateProfileDto);

    return this.profilesRepository.save(profile);
  }

  async updateByUsername(
    username: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const user = await this.usersRepository.findOne({
      where: { username },
      relations: ['profile'],
    });

    if (!user || !user.profile) {
      throw new NotFoundException('Profile not found');
    }

    Object.assign(user.profile, updateProfileDto);

    await this.usersRepository.save(user);

    return user.profile;
  }

  async updateByUserId(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['profile'],
    });

    if (!user || !user.profile) {
      throw new NotFoundException('Profile not found');
    }

    Object.assign(user.profile, updateProfileDto);

    await this.usersRepository.save(user);

    return user.profile;
  }

  async remove(userId: string): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
    });

    if (!user || !user.profile) {
      throw new NotFoundException('Profile not found');
    }

    user.profile = null;
    await this.usersRepository.save(user);
  }
}
