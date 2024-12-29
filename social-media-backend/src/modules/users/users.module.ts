import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '@/modules/users/entities/user.entity';
import { Profile } from '@/modules/profiles/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
