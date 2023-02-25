import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Exclude } from 'class-transformer';
 
export class ModificarInvoiceDto {
  @IsOptional()
  @Exclude()
  _id?: string;
 
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  numFactura?: number;
 
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  fecha?: string;
 
  @IsOptional()
  @IsString()
  vence?: string;
 
  @IsOptional()
  @IsNumber()
  monto?: number;
}