import { IsNotEmpty, IsString  } from "class-validator";

export class LoginAuthDto {
    @IsNotEmpty()
    @IsString()
    contraseña: string;
    
    @IsString()
    usuario: string;
    
}