import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './Dtos/login.dto';
import { RegisterDto } from './Dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() request: RegisterDto) {
    const body: RegisterDto = request;
    console.log(body);
    return await this.authService.register(body);
  }

  @Post('login')
  async login(@Body() request: LoginDto) {
    return await this.authService.login(request);
  }
}
