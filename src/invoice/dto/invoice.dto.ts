import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CrearInvoiceDto {
    @IsNumber()
    @IsNotEmpty()
    numFactura: number;
    
    @IsString()
    fecha: string;
    
    @IsString()
    vence: string;

    @IsNumber()
    @IsNotEmpty()
    monto: number;
}