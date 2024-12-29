import { Module } from '@nestjs/common';
import { ImageService } from './services/image.service';
import { S3ConfigService } from '@/config/s3.config';

@Module({
  providers: [ImageService, S3ConfigService],
  exports: [ImageService],
})
export class CommonModule {}
