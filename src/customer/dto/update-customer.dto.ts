import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
    
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    name?: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    userName?: string;

    @IsNotEmpty()
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    password?: string;
    
}
