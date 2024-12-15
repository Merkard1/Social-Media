import { Injectable } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3 } from 'aws-sdk';
import sanitize from 'sanitize-filename';
import { S3ConfigService } from './s3.config';
import { Request } from 'express';

@Injectable()
export class MulterConfigService {
  constructor(private s3ConfigService: S3ConfigService) {}

  createMulterOptions(): MulterOptions {
    const s3 = new S3({
      accessKeyId: this.s3ConfigService.accessKeyId,
      secretAccessKey: this.s3ConfigService.secretAccessKey,
      region: this.s3ConfigService.region,
      logger: console,
    });

    return {
      storage: multerS3({
        s3: s3,
        bucket: this.s3ConfigService.bucketName,
        // acl: 'public-read',
        key: (
          req: Request,
          file: Express.Multer.File,
          cb: (error: Error | null, key?: string) => void,
        ) => {
          const sanitizedFilename = sanitize(file.originalname);
          const uniqueSuffix =
            Date.now().toString() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `articles/${uniqueSuffix}-${sanitizedFilename}`);
        },
      }),
      fileFilter: (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, acceptFile: boolean) => void,
      ) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
          return cb(
            new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'image'),
            false,
          );
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    };
  }
}
