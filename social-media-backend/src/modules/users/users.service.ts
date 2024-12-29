import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@/modules/users/entities/user.entity';
import { Profile } from '@/modules/profiles/entities/profile.entity';
import { UserDto } from './dto/user.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
  ) {}

  /**
   * Search users by username with pagination.
   */
  async searchUsers(
    q: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<Partial<UserDto>[]> {
    if (!q) return [];

    const skip = (page - 1) * limit;

    const users = await this.usersRepository.find({
      where: { username: Like(`%${q}%`) },
      take: limit,
      skip,
      select: ['id', 'username'],
    });

    return users.map((user) => plainToClass(UserDto, user));
  }

  /**
   * Create a new user with hashed password.
   */
  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    if (createUserDto.password !== createUserDto.repeatPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const existingUser = await this.usersRepository.findOne({
      where: [
        { username: createUserDto.username },
        { email: createUserDto.email },
      ],
    });
    if (existingUser) {
      throw new BadRequestException('Username or email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const profile = this.profilesRepository.create();

    const user = this.usersRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
      roles: createUserDto.roles || ['USER'],
      profile: profile,
      jsonSettings: {
        theme: 'app_dark_theme',
        isFirstVisit: false,
        settingsPageHasBeenOpen: false,
        isArticlesPageWasOpened: false,
      },
    });

    const savedUser = await this.usersRepository.save(user);

    return plainToClass(UserDto, savedUser);
  }

  /**
   * Find a user by username (without password).
   */
  async findOneByUsername(username: string): Promise<UserDto> {
    const user = await this.usersRepository.findOne({
      where: { username },
      relations: ['profile'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return plainToClass(UserDto, user);
  }

  /**
   * Find a user by ID (without password).
   */
  async findById(id: string): Promise<UserDto> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['articles', 'profile'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return plainToClass(UserDto, user);
  }

  /**
   * Find a user with profile by user ID (without password).
   */
  async findUserWithProfile(userId: string): Promise<UserDto> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return plainToClass(UserDto, user);
  }

  /**
   * Update a user's information.
   */
  async update(userId: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.password) {
      const saltRounds = 10;
      user.password = await bcrypt.hash(updateUserDto.password, saltRounds);
      delete updateUserDto.password;
    }

    if (updateUserDto.jsonSettings) {
      user.jsonSettings = {
        ...user.jsonSettings,
        ...updateUserDto.jsonSettings,
      };
      delete updateUserDto.jsonSettings;
    }

    Object.assign(user, updateUserDto);

    const updatedUser = await this.usersRepository.save(user);

    return plainToClass(UserDto, updatedUser);
  }

  /**
   * Validate a user by username and password.
   * Returns the user object without the password if valid.
   */
  async validateUser(
    username: string,
    password: string,
  ): Promise<UserDto | null> {
    const user = await this.findOneByUsernameWithPassword(username);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...result } = user;
    return plainToClass(UserDto, result);
  }

  /**
   * Remove a user by ID.
   */
  async remove(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }

  /**
   * Find a user by username including password (for auth).
   */
  async findOneByUsernameWithPassword(username: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { username },
      select: ['id', 'username', 'email', 'password', 'roles'],
      relations: ['profile'],
    });
  }
}
