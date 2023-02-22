import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CustomerDto } from 'src/customer/dto/customer.dto';
import { Customer } from 'src/customer/types/customer';
import { LoginAuthDto } from '../dto/login-auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel("customer") private customerModel: Model<Customer>,
        private jwtService: JwtService
        ) {}
  
    async registrar (customerDto: CustomerDto): Promise<Customer> {
        const { contraseña } = customerDto;
        const hashear = await bcrypt.hash(contraseña, 8);
        customerDto = {...customerDto, contraseña: hashear}
        const customer = new this.customerModel(customerDto);
        await customer.save();
        return customer
    }

    async login (customerDto: LoginAuthDto) {
        const { usuario, contraseña } = customerDto
        const customer = await this.customerModel.findOne({ usuario });
        if (!customer) throw new NotFoundException("El customer no existe");        
        const validar = await bcrypt.compare(contraseña, customer.contraseña);
        if (!validar) throw new HttpException("contraseña incorrecta", 403);
        const payload = {id:customer._id, usuario: customer.usuario};
        const token = this.jwtService.sign(payload);
        const datos = { usuario: customer, token };
        return datos
    }

}
