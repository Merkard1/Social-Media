import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from '@/modules/users/entities/user.entity';
import { Profile } from './entities/profile.entity';
import { ImageService } from '@/common/services/image.service';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly imageService: ImageService,
  ) {}

  /**
   * Find a profile by username.
   * @param username - The username to search for.
   * @returns The user's profile if found.
   * @throws NotFoundException if the profile is not found.
   */
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

  /**
   * Update a profile by username.
   * @param username - The username of the profile to update.
   * @param updateProfileDto - The data to update the profile with.
   * @returns The updated profile.
   * @throws NotFoundException if the profile is not found.
   */
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
