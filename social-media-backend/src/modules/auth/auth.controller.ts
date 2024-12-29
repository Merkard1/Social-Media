import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../users/dto/user.dto';
import { plainToClass } from 'class-transformer';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 201,
    description: 'User successfully logged in',
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR...' },
        user: {
          type: 'object',
          $ref: '#/components/schemas/UserDto',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ accessToken: string; user: UserDto }> {
    const { username, password } = loginDto;
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const loginResult = await this.authService.login(user);
    return {
      accessToken: loginResult.accessToken,
      user: plainToClass(UserDto, loginResult.user, {
        excludeExtraneousValues: true,
      }),
    };
  }
}
