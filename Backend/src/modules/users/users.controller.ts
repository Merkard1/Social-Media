import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@/modules/users/entities/user.entity';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { SearchUsersDto } from './dto/search-users.dto';
import { UserDto } from './dto/user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // TODO Swagger
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('search')
  @ApiOperation({ summary: 'Search users by username' })
  @ApiQuery({
    name: 'query',
    required: true,
    description: 'Search term for usernames',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of users per page',
  })
  @ApiResponse({
    status: 200,
    description: 'List of matching users',
    type: [User],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async searchUsers(@Query() searchUsersDto: SearchUsersDto) {
    return this.usersService.searchUsers(
      searchUsersDto.q,
      searchUsersDto.page,
      searchUsersDto.limit,
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: { $ref: '#/components/schemas/ErrorResponse' },
  })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Get user with profile by user ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID of the user to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    schema: { $ref: '#/components/schemas/ErrorResponse' },
  })
  async getUserWithProfile(
    @Param('id') id: string,
  ): Promise<Omit<UserDto, 'password'>> {
    const user = await this.usersService.findUserWithProfile(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get('username/:username')
  @ApiOperation({ summary: 'Get user by username' })
  @ApiParam({
    name: 'username',
    type: 'string',
    description: 'Username of the user to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    schema: { $ref: '#/components/schemas/ErrorResponse' },
  })
  async findOne(@Param('username') username: string) {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      return user;
    }
    throw new NotFoundException('User not found');
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Patch()
  @ApiOperation({ summary: "Update the authenticated user's information" })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    schema: { $ref: '#/components/schemas/ErrorResponse' },
  })
  async update(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    const userId = req.user.userId || req.user.id;
    const updatedUser = await this.usersService.update(userId, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID of the user to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    schema: { $ref: '#/components/schemas/MessageResponse' },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    schema: { $ref: '#/components/schemas/ErrorResponse' },
  })
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    await this.usersService.remove(id);
    return { message: 'User deleted successfully' };
  }
}
