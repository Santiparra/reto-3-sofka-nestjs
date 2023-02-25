import { Body, Controller, Post } from '@nestjs/common';
import { CustomerDto } from 'src/customer/dto/customer.dto';
import { LoginAuthDto } from '../dto/login-auth.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

//Ruta de registro de usuario, propiedades requeridas en el JSON:
//Nombre, usuario, contraseña, email
//Nota, esta ruta solo nos registra para agregarnos a la base de datos de usuarios 

    @Post("registrar")
    registrarAdmin(@Body() customerDto: CustomerDto) {
        return this.authService.registrar(customerDto)
    }

//Ruta de ingreso, nos devuelve el usuario mas token de ingreso para autentificar
// En esta ruta las propiedades requeridas en el JSON son usuario y contraseña (sin hashear)

    @Post("login")
    iniciarSesion(@Body() customerLogin: LoginAuthDto) {
        return this.authService.login(customerLogin)
    }

}
