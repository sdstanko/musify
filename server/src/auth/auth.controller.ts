import { Body, Controller, Post, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto.userName, dto.password);
  }

  @Get('check')
  check(@Body() user) {
    return this.authService.check(user);
  }
}