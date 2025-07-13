import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthLoginDto } from './dto/auth-login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
   constructor(private authService: AuthService) {}

   @Post('login')
   login(@Body() body: AuthLoginDto) {
      return this.authService.login(body.email, body.password);
   }
}
