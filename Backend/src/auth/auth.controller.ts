// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    const user = await this.authService.validateUser(
      req.body.username,
      req.body.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}