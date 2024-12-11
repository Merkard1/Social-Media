import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3ConfigService {
  constructor(private configService: ConfigService) {}

  get accessKeyId(): string {
    const val = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    if (!val) throw new Error('AWS_ACCESS_KEY_ID not defined');
    return val;
  }

  get secretAccessKey(): string {
    const val = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');
    if (!val) throw new Error('AWS_SECRET_ACCESS_KEY not defined');
    return val;
  }

  get region(): string {
    const val = this.configService.get<string>('AWS_S3_REGION');
    if (!val) throw new Error('AWS_S3_REGION not defined');
    return val;
  }

  get bucketName(): string {
    const val = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    if (!val) throw new Error('AWS_S3_BUCKET_NAME not defined');
    return val;
  }
}
