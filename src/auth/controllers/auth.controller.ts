import { Controller, Get, Post, UseGuards, Request, Logger } from '@nestjs/common';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  create(@Request() req): any {
    return {msg: "logged in"};
  }
    
  //ruta de testeo del serializer
  @UseGuards(AuthenticatedGuard)
  @Get()
  myMetadataHeaderInfo(@Request() req) {
    return req.user;
  }

}
