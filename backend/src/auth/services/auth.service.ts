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
        const { contrasena } = customerDto;
        const hashear = await bcrypt.hash(contrasena, 8);
        customerDto = {...customerDto, contrasena: hashear}
        const customer = new this.customerModel(customerDto);
        await customer.save();
        return customer
    }

    async login (customerDto: LoginAuthDto) {
        const { usuario, contrasena } = customerDto
        const customer = await this.customerModel.findOne({ usuario });
        if (!customer) throw new NotFoundException("El customer no existe");        
        const validar = await bcrypt.compare(contrasena, customer.contrasena);
        if (!validar) throw new HttpException("contrasena incorrecta", 403);
        const payload = {id:customer._id, usuario: customer.usuario};
        const token = this.jwtService.sign(payload);
        const datos = { usuario: customer, token };
        return datos
    }

}
