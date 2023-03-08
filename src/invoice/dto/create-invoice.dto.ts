import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateInvoiceDto {
    
    @IsString()
    @IsNotEmpty()
    fecha: string;

    @IsString()
    @IsNotEmpty()
    vence: string;

    @IsNumber()
    @IsNotEmpty()
    monto: number;
    
}
