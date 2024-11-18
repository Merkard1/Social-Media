import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Profile } from './entities/profile.entity';
import { UsersService } from '../users/users.service';

import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private profilesRepository: Repository<Profile>,
    private usersService: UsersService,
  ) {}

  async create(
    userId: string,
    createProfileDto: CreateProfileDto,
  ): Promise<Profile> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingProfile = await this.profilesRepository.findOne({
      where: { id: userId },
    });
    if (existingProfile) {
      throw new BadRequestException('Profile already exists for this user');
    }

    const profile = this.profilesRepository.create({
      id: userId,
      ...createProfileDto,
      user,
    });

    return this.profilesRepository.save(profile);
  }

  async findByUsername(username: string): Promise<Profile> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const profile = await this.profilesRepository.findOne({
      where: { id: user.id },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  async findByUserId(id: string): Promise<Profile> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const profile = await this.profilesRepository.findOne({
      where: { id: user.id },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  async updateById(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const profile = await this.profilesRepository.findOne({
      where: { id },
    });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    Object.assign(profile, updateProfileDto);

    return this.profilesRepository.save(profile);
  }

  async updateByUsername(
    username: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const user = await this.usersService.findOneByUsername(username);

    if (!user) {
      throw new NotFoundException('Profile not found');
    }

    const profile = await this.profilesRepository.findOne({
      where: { id: user.id },
    });

    Object.assign(profile, updateProfileDto);

    return this.profilesRepository.save(profile);
  }

  async remove(userId: string): Promise<void> {
    const result = await this.profilesRepository.delete({ id: userId });
    if (result.affected === 0) {
      throw new NotFoundException('Profile not found');
    }
  }
}
