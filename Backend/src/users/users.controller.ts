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
} from '@nestjs/common';
import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  @Get('id/:id')
  async getUserWithProfile(
    @Param('id') id: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findUserWithProfile(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, ...result } = user;
    return result;
  }

  @Get('username/:username')
  async findOne(@Param('username') username: string) {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    throw new NotFoundException('User not found');
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    const userId = req.user.userId || req.user.id;
    const updatedUser = await this.usersService.update(userId, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    await this.usersService.remove(id);
    return { message: 'User deleted successfully' };
  }
}
