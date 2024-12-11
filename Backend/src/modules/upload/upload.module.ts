import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { S3ConfigService } from '@/config/s3.config';
import { MulterConfigService } from '@/config/multer.config';

@Module({
  imports: [ConfigModule],
  providers: [S3ConfigService, MulterConfigService],
  exports: [S3ConfigService, MulterConfigService],
})
export class UploadModule {}
