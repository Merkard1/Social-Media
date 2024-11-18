import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Profile } from './entities/profile.entity';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';

import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), UsersModule],
  providers: [ProfilesService],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
