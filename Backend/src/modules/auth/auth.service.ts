import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../users/dto/user.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validate a user by username and password.
   * Returns the user object without the password if valid.
   */
  async validateUser(username: string, pass: string): Promise<UserDto | null> {
    const user =
      await this.usersService.findOneByUsernameWithPassword(username);
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      return null;
    }

    const { password, ...result } = user;
    return plainToClass(UserDto, result);
  }

  /**
   * Login a user and return a JWT token along with user data (without password).
   */
  async login(user: UserDto): Promise<{ accessToken: string; user: UserDto }> {
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }
}
