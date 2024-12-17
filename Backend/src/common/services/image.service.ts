import { Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { S3ConfigService } from '@/config/s3.config';

@Injectable()
export class ImageService {
  private s3: S3;
  private readonly logger = new Logger(ImageService.name);

  constructor(private readonly s3ConfigService: S3ConfigService) {
    this.s3 = new S3({
      accessKeyId: this.s3ConfigService.accessKeyId,
      secretAccessKey: this.s3ConfigService.secretAccessKey,
      region: this.s3ConfigService.region,
      logger: console,
    });
  }

  async uploadImage(file: Express.MulterS3File): Promise<string> {
    return file.location;
  }

  async deleteImageFromS3(imageUrl: string): Promise<void> {
    if (!imageUrl) return;

    try {
      const url = new URL(imageUrl);
      const key = decodeURIComponent(url.pathname.substring(1));

      await this.s3
        .deleteObject({
          Bucket: this.s3ConfigService.bucketName,
          Key: key,
        })
        .promise();

      this.logger.debug(`Deleted image from S3: ${key}`);
    } catch (error) {
      this.logger.error('Failed to delete image from S3', error);
    }
  }
}
