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

  @Patch(':username')
  @ApiOperation({ summary: 'Update profile by username' })
  @ApiParam({
    name: 'username',
    type: 'string',
    description: 'Username of the profile to update',
  })
  @ApiBody({
    description: 'Profile update payload with optional avatar',
    schema: {
      type: 'object',
      properties: {
        first: { type: 'string' },
        lastname: { type: 'string' },
        age: { type: 'number' },
        currency: { type: 'string' },
        country: { type: 'string' },
        city: { type: 'string' },
        avatar: {
          type: 'string',
          format: 'binary',
          description: 'Avatar image file',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully',
    type: Profile,
  })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  @UseInterceptors(FileInterceptor('avatar'))
  async updateProfileByUsername(
    @Param('username') username: string,
    @Body() body: UpdateProfileDto,
    @UploadedFile() file?: Express.MulterS3File,
  ) {
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException('Failed to update the profile');
    }
  }
}
