import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { User } from '@/modules/users/entities/user.entity';
import { Profile } from './entities/profile.entity';
import { MulterModule } from '@nestjs/platform-express';
import { S3Module } from '../s3/s3.module';
import { MulterConfigService } from '@/config/multer.config';
import { S3ConfigService } from '@/config/s3.config';
import { ImageService } from '@/common/services/image.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, User]),
    MulterModule.registerAsync({
      imports: [S3Module],
      useClass: MulterConfigService,
    }),
    S3Module,
  ],
  providers: [ProfilesService, S3ConfigService, ImageService],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
