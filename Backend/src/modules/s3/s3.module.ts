import { Module } from '@nestjs/common';
import { S3ConfigService } from '@/config/s3.config';

@Module({
  providers: [S3ConfigService],
  exports: [S3ConfigService],
})
export class S3Module {}
