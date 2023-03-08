import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateCustomerDto } from "../dto/create-customer.dto";
import { UpdateCustomerDto } from "../dto/update-customer.dto";
import { Customer } from "../entities/customer.entity";
import * as bcrypt from 'bcrypt';
import { createRandomCustomer } from "src/utils/seeder";

@Injectable()
export class CustomerService {

  private readonly logger = new Logger(CustomerService.name);
  
  customers: Customer[] =[
    {id: 0, name: "Georgina", userName: "Geo", email: "laGeo@mail.com", password: "password", roles: ["ADMIN"]},
    {id: 1, name: "Jorge", userName: "ElJorge", email: "Jorgito@mail.com", password: "password", roles: ["ADMIN"]},
    {id: 2, name: "Valentin", userName: "Tin", email: "Valentin@mail.com", password: "password", roles: ["ADMIN"]},  
  ]  

  removeCustomer( id: number ): Customer[] {
    this.customers = this.customers.filter(esto => esto.id !== id);
    return this.customers;
  }

  async updateCustomer( id: number, updateCustomerDto: UpdateCustomerDto ): Promise<Customer> {
    let customer = this.findCustomerByID(id);
    const index = this.customers.indexOf ( customer );
    if ( !customer ) throw new NotFoundException("Este Customer no se encuentra en la base de datos");
    if (updateCustomerDto.password) {
      const { password } = updateCustomerDto;
      const hashedPasswd = await bcrypt.hash(password, 10);
      updateCustomerDto = {...updateCustomerDto, password: hashedPasswd}
    }
    customer = {...customer, ...updateCustomerDto};
    this.customers.splice(index, 1, customer);
    return customer
  }

  async replaceCustomer(id: number, createCustomerDto: CreateCustomerDto): Promise<Customer> {
    let customer = this.findCustomerByID(id);    
    const index = this.customers.indexOf ( customer );
    if ( !customer ) this.createCustomer(createCustomerDto);
    const { password } = createCustomerDto;
    const hashedPasswd = await bcrypt.hash(password, 10);
    customer = {...customer, ...createCustomerDto, password: hashedPasswd};
    this.customers.splice(index, 1, customer);
    return customer
  }

  async createCustomer( createCustomerDto: CreateCustomerDto ): Promise<Customer> {
    let id = this.generateId();
    const { password } = createCustomerDto;
    const hashedPasswd = await bcrypt.hash(password, 10);
    let customer = {  id: id, ...createCustomerDto, password: hashedPasswd, roles: ["USER"] };    
    this.customers.push(customer);
    return customer
  }

  async findCustomerByName( customerName: string ): Promise<Customer>  {
    return this.customers.find(customer => customer.userName === customerName);
  }

  findCustomerByID( id: number ): Customer {
    const customer = this.customers.find(esto => esto.id === id);
    return customer   
  }

  findAllCustomers(): Customer[] {
    return this.customers;
  }

  generateId(): number {
    let randomId = Math.floor(Math.random() * 101);
    this.customers.forEach((customer) => {
      if (customer.id === randomId) this.generateId()
    })
    return randomId
  }

  seedMyFakeDb(seeds: number) {
    for (let i = 0; i < seeds; i++) {
      this.customers.push(createRandomCustomer());
      };
    return this.customers    
    }
}
