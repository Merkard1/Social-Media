import {
  Controller,
  Get,
  Param,
  Delete,
  Body,
  UseGuards,
  Request,
  Post,
  Patch,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';

import { CreateProfileDto } from './dto/create-profile.dto';

import { AuthGuard } from '@nestjs/passport';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createProfile(
    @Request() req,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    const userId = req.user.sub; // Ensure 'sub' contains userId

    const existingProfile = await this.profilesService.findByUserId(userId);
    if (existingProfile) {
      throw new BadRequestException('Profile already exists for this user');
    }

    return this.profilesService.create(userId, createProfileDto);
  }

  @Get(':username')
  async getProfileByUsername(
    @Param('username') username: string,
  ): Promise<Profile> {
    return this.profilesService.findByUsername(username);
  }

  @Get('id/:id')
  async getProfileById(@Param('id') id: string): Promise<Profile> {
    return this.profilesService.findByUserId(id);
  }

  @Patch(':username')
  async updateProfileByUsername(
    @Param('username') username: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const updatedProfile = await this.profilesService.updateByUsername(
      username,
      updateProfileDto,
    );

    if (!updatedProfile) {
      throw new NotFoundException('Profile not found');
    }

    return updatedProfile;
  }

  @Patch('id/:id')
  async updateProfileById(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const updatedProfile = await this.profilesService.updateByUserId(
      id,
      updateProfileDto,
    );

    if (!updatedProfile) {
      throw new NotFoundException('Profile not found');
    }

    return updatedProfile;
  }

  // @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteProfile(@Request() req) {
    const userId = req.user.sub;
    await this.profilesService.remove(userId);
    return { message: 'Profile deleted successfully' };
  }
}
