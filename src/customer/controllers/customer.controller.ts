import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Put, 
  UsePipes, 
  ValidationPipe, 
  ParseIntPipe, 
  HttpStatus, 
  NotFoundException, 
  Res, 
  UseGuards,
  Logger
} from "@nestjs/common";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";
import { Roles } from "src/utils/roles.decorator";
import { CreateCustomerDto } from "../dto/create-customer.dto";
import { UpdateCustomerDto } from "../dto/update-customer.dto";
import { Customer } from "../entities/customer.entity";
import { Role } from "../entities/roles.enum";
import { CustomerService } from "../services/customer.service";


@Controller("customer")
export class CustomerController {

  private readonly logger = new Logger(CustomerController.name);

  constructor(private readonly customerService: CustomerService) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  findAllCustomers( @Res() res ): Customer[] {
    const customers = this.customerService.findAllCustomers();
    if (!customers) throw new NotFoundException("La base de datos para Customers no se encuentra"); 
    return res.status(HttpStatus.OK).json({ msg: "Customers:", customers });
  }

  @UseGuards(AuthenticatedGuard)
  @Get(":id")
  findCustomerByID( 
    @Param("id", ParseIntPipe) id: number,  
    @Res() res 
  ): Customer {
    const customer = this.customerService.findCustomerByID(id);
    if (!customer) throw new NotFoundException("Customer no encontrado");      
    return res.status(HttpStatus.OK).json({ msg: "Customer:", customer });
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createCustomer( 
    @Body() createCustomerDto: CreateCustomerDto,  
    @Res() res 
  ): Promise<Customer> {
    const createdCustomer = await this.customerService.createCustomer(createCustomerDto);
    return res.status(HttpStatus.OK).json({ msg: "Customer creado con éxito:", createdCustomer });
  }
  
  @UseGuards(AuthenticatedGuard)
  @Patch(":id")
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateCustomer( 
    @Param("id", ParseIntPipe) id: number, 
    @Body() updateCustomerDto: UpdateCustomerDto,  
    @Res() res 
  ): Promise<Customer> {
    const editedCustomer = await this.customerService.updateCustomer(id, updateCustomerDto);   
    return res.status(HttpStatus.OK).json({ msg: "Customer editado con éxito:", editedCustomer });    
  }

  @UseGuards(AuthenticatedGuard)
  @Put(":id")
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async replaceCustomer( 
    @Param("id", ParseIntPipe) id: number, 
    @Body() createCustomerDto: CreateCustomerDto,  
    @Res() res 
  ): Promise<Customer> {
    const replacedCustomer = await this.customerService.replaceCustomer(id, createCustomerDto);
    return res.status(HttpStatus.OK).json({ msg: "Customer actualizado o editado con éxito:", replacedCustomer }); 
  }

  @Roles(Role.ADMIN)
  @Delete(":id")
  removeCustomer( @Param("id", ParseIntPipe) id: number, @Res() res ): Customer {
    const deletedCustomer= this.customerService.removeCustomer(id);
    if (!deletedCustomer) throw new NotFoundException("Este Customer no existe");      
    return res.status(HttpStatus.OK).json({ msg: "El Customer ya no se encuentra en la base de datos", deletedCustomer });
  }

  @Roles(Role.ADMIN)
  @Post(":seeds")
  seedMyFakeDb( @Param("seeds", ParseIntPipe) seeds: number ) {
    return this.customerService.seedMyFakeDb(seeds);
  }

}
