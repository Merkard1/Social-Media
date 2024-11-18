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

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createProfile(
    @Request() req,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    const userId = req.user.userId;

    const existingProfile = await this.profilesService.findByUserId(userId);
    if (existingProfile) {
      throw new BadRequestException('Profile already exists for this user');
    }

    return this.profilesService.create(userId, createProfileDto);
  }

  @Get(':username')
  async getProfileByUsername(@Param('username') username: string) {
    return this.profilesService.findByUsername(username);
  }

  @Get('id/:id')
  async getProfileById(@Param('id') id: string) {
    const profile = await this.profilesService.findByUserId(id);
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  @Patch(':username')
  async updateProfileByUsername(
    @Param('username') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const updatedProfile = await this.profilesService.updateByUsername(
      id,
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
    const updatedProfile = await this.profilesService.updateById(
      id,
      updateProfileDto,
    );

    if (!updatedProfile) {
      throw new NotFoundException('Profile not found');
    }

    return updatedProfile;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteProfile(@Request() req) {
    const userId = req.user.userId;
    await this.profilesService.remove(userId);
    return { message: 'Profile deleted successfully' };
  }
}
