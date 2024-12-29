import {
  Controller,
  Get,
  Param,
  Body,
  Patch,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
  InternalServerErrorException,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  /**
   * Retrieve a profile by username.
   * @param username - The username to search for.
   * @returns The profile if found.
   */
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
  @Get(':username')
  async getProfileByUsername(
    @Param('username') username: string,
  ): Promise<Profile> {
    return this.profilesService.findByUsername(username);
  }

  /**
   * Update a profile by username, optionally including an avatar image.
   * @param username - The username of the profile to update.
   * @param body - The profile update payload.
   * @param file - Optional avatar image file.
   * @returns The updated profile.
   */
  @ApiBody({
    description: 'Profile update payload with optional avatar',
    schema: {
      type: 'object',
      properties: {
        first: { type: 'string', example: 'John' },
        lastname: { type: 'string', example: 'Doe' },
        age: { type: 'number', example: 30 },
        currency: { type: 'string', example: 'USD' },
        country: { type: 'string', example: 'USA' },
        city: { type: 'string', example: 'New York' },
        avatar: {
          type: 'string',
          format: 'binary',
          description: 'Avatar image file',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update profile by username' })
  @ApiParam({
    name: 'username',
    type: 'string',
    description: 'Username of the profile to update',
  })
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully',
    type: Profile,
  })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  @Patch(':username')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateProfileByUsername(
    @Param('username') username: string,
    @Body() body: UpdateProfileDto,
    @UploadedFile() file?: Express.MulterS3File,
  ): Promise<Profile> {
    const updateProfileDto: UpdateProfileDto = {
      first: body.first,
      lastname: body.lastname,
      age: body.age ? Number(body.age) : undefined,
      currency: body.currency,
      country: body.country,
      city: body.city,
    };

    if (file && file.location) {
      updateProfileDto.avatar = file.location;
    }

    try {
      const updatedProfile = await this.profilesService.updateByUsername(
        username,
        updateProfileDto,
      );

      if (!updatedProfile) {
        throw new NotFoundException('Profile not found');
      }

      return updatedProfile;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update the profile',
        error,
      );
    }
  }
}
