import { 
    IsEmail, 
    IsNotEmpty, 
    IsString } from "class-validator";

export class CustomerDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    contraseña: string;
    
    @IsString()
    usuario: string;
    
}