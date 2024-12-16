import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from '@/modules/users/entities/user.entity';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<Profile> {
    const user = await this.usersRepository.findOne({
      where: { username },
      relations: ['profile'],
    });
    if (!user || !user.profile) {
      throw new NotFoundException(`Profile for user ${username} not found`);
    }
    return user.profile;
  }

  async updateByUsername(
    username: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const user = await this.usersRepository.findOne({
      where: { username },
      relations: ['profile'],
    });

    if (!user || !user.profile) {
      throw new NotFoundException('Profile not found');
    }

    Object.assign(user.profile, updateProfileDto);

    await this.usersRepository.save(user);

    return user.profile;
  }
}
