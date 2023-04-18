import { AUTH_TOKEN } from '@/constants';
import { ProfileGuard } from '@/guards';
import { Body, Controller, Get, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SessionEntity } from '../session';
import { UserEntity, UserService } from '../user';
import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto } from './dto';
import { AuthEntity } from './entities';

@ApiTags('AuthController')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  /**
   * Register user.
   */
  @Post('/register')
  async register(@Res({ passthrough: true }) response: any, @Body() credentials: RegisterAuthDto): Promise<AuthEntity> {
    const result = await this.authService.register(credentials);
    response.cookie(AUTH_TOKEN, result.session.id);
    return result;
  }

  /**
   * Login user.
   */
  @Post('/login')
  async login(@Res({ passthrough: true }) response: any, @Body() credentials: LoginAuthDto): Promise<AuthEntity> {
    const result = await this.authService.login(credentials);
    response.cookie(AUTH_TOKEN, result.session.id);
    return result;
  }

  /**
   * Get user and session by auth token in cookie
   */
  @UseGuards(ProfileGuard)
  @Get('/profile')
  async getProfile(@Req() req: any): Promise<AuthEntity> {
    const session = new SessionEntity(req.session);
    const user = new UserEntity(await this.userService.getByIdOrFail(req.session.user.id));
    return new AuthEntity({ session, user });
  }

  /**
   * Mark session as expired and clear auth token cookie.
   */
  @Put('/logout')
  async logout(@Res({ passthrough: true }) response: any, @Req() req: any): Promise<boolean> {
    try {
      await this.authService.logout(req.cookies[AUTH_TOKEN]);
      response.clearCookie(AUTH_TOKEN);
      return true;
    } catch (e) {
      return false;
    }
  }
}
