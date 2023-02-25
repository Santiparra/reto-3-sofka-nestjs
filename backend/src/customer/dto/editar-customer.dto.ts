import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';
 
export class EditarCustomerDto {
  @IsOptional()
  @Exclude()
  _id?: string;
 
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nombre?: string
 
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  email?: string;
 
  @IsOptional()
  @IsString()
  contrasena?: string;
 
  @IsOptional()
  @IsString()
  usuario: string;
}
