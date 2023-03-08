import { Controller, Get, Post, UseGuards, Request, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  create(@Request() req): any {
    return {msg: "logged in"};
  }
    
  //ruta dev, borrar en entrega
  @UseGuards(AuthenticatedGuard)
  @Get()
  myMetadataHeaderInfo(@Request() req) {
    return req.user;
  }

}
