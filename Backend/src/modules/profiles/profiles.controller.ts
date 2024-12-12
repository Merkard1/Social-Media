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
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new profile' })
  @ApiBody({ type: CreateProfileDto })
  @ApiResponse({
    status: 201,
    description: 'Profile created successfully',
    type: Profile,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async createProfile(
    @Request() req,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    const userId = req.user.sub;

    const existingProfile = await this.profilesService.findByUserId(userId);
    if (existingProfile) {
      throw new BadRequestException('Profile already exists for this user');
    }

    return this.profilesService.create(userId, createProfileDto);
  }

  @Get(':username')
  @ApiOperation({ summary: 'Get profile by username' })
  @ApiParam({
    name: 'username',
    type: 'string',
    description: 'Username of the profile to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'Profile retrieved successfully',
    type: Profile,
  })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  async getProfileByUsername(
    @Param('username') username: string,
  ): Promise<Profile> {
    return this.profilesService.findByUsername(username);
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Get profile by user ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'User ID of the profile to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'Profile retrieved successfully',
    type: Profile,
  })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  async getProfileById(@Param('id') id: string): Promise<Profile> {
    return this.profilesService.findByUserId(id);
  }

  @Patch(':username')
  @ApiOperation({ summary: 'Update profile by username' })
  @ApiParam({
    name: 'username',
    type: 'string',
    description: 'Username of the profile to update',
  })
  @ApiBody({ type: UpdateProfileDto })
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully',
    type: Profile,
  })
  @ApiResponse({ status: 404, description: 'Profile not found' })
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
  @ApiOperation({ summary: 'Update profile by user ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'User ID of the profile to update',
  })
  @ApiBody({ type: UpdateProfileDto })
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully',
    type: Profile,
  })
  @ApiResponse({ status: 404, description: 'Profile not found' })
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

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete()
  @ApiOperation({ summary: "Delete the authenticated user's profile" })
  @ApiResponse({
    status: 200,
    description: 'Profile deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  async deleteProfile(@Request() req) {
    const userId = req.user.sub;
    await this.profilesService.remove(userId);
    return { message: 'Profile deleted successfully' };
  }
}
