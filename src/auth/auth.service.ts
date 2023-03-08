import { Injectable, Logger } from '@nestjs/common';
import { CustomerService } from 'src/customer/services/customer.service';

@Injectable()
export class AuthService {

  private readonly logger = new Logger(AuthService.name);

  constructor (private customerService: CustomerService) {}

  async validateCustomer ( userName: string, password: string ) {
    this.logger.log("Validando customer");
    const customerExist = await this.customerService.findCustomerByName(userName);
    if (customerExist && customerExist.password === password) {
      const { password, name, email, ...rest } = customerExist
      this.logger.log("Customer validado");
      return rest
    } 
    this.logger.log("no se pudo validar el customer");
    return null

  }

}
