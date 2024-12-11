import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { S3ConfigService } from '@/config/s3.config';

@Injectable()
export class UploadService {
  private s3: S3;

  constructor(private readonly s3ConfigService: S3ConfigService) {
    this.s3 = new S3({
      accessKeyId: this.s3ConfigService.accessKeyId,
      secretAccessKey: this.s3ConfigService.secretAccessKey,
      region: this.s3ConfigService.region,
    });
  }

  async deleteFile(key: string): Promise<void> {
    await this.s3
      .deleteObject({
        Bucket: this.s3ConfigService.bucketName,
        Key: key,
      })
      .promise();
  }

  getSignedUrl(key: string, expires: number = 60): string {
    return this.s3.getSignedUrl('getObject', {
      Bucket: this.s3ConfigService.bucketName,
      Key: key,
      Expires: expires,
    });
  }
}
