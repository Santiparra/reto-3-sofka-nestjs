import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateInvoiceDto } from './create-invoice.dto';

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {
    
    @IsString()
    @IsOptional()
    fecha?: string;

    @IsString()
    @IsOptional()
    vence?: string;

    @IsNumber()
    @IsOptional()
    @IsNotEmpty()
    monto?: number;
    
}
