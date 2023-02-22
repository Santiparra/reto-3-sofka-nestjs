import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../types/customer';
import { CustomerDto } from '../dto/customer.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EditarCustomerDto } from '../dto/editar-customer.dto';

@Injectable()
export class CustomerService {
    constructor(@InjectModel("customer") private customerModel: Model<Customer>) {}

    async buscarCustomers(): Promise<Customer[]> {
        const customers = await this.customerModel.find();
        return  customers
    }

    async buscarCustomer (customerID: number): Promise<Customer> {
        const customer = await this.customerModel.findById(customerID);
        return customer
    }

    async editarCustomer (customerID: number, customerDto: EditarCustomerDto): Promise<Customer> {
        const customerEditado = await this.customerModel
        .findByIdAndUpdate(customerID, customerDto, { new: true });
        return customerEditado
    }

    async actualizarCustomer (customerID: number, customerDto: EditarCustomerDto) {
        const customerActualizado = await this.customerModel
        .findByIdAndUpdate(customerID, customerDto)
        .setOptions({ overwrite: true, new: true })
        .populate("nombre")
        .populate("email")
        .populate("contraseña")
        .populate("usuario");
        if (!customerActualizado) {
            throw new NotFoundException();
          };
        return customerActualizado
    }

    async borrarCustomer (customerID: number): Promise<Customer> {
        const customerBorrado = await this.customerModel.findByIdAndDelete(customerID);
        return customerBorrado
    }

}
