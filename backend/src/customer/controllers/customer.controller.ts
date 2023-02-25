import { 
    Body,
    ClassSerializerInterceptor,
    Controller, 
    Delete, 
    Get, 
    HttpStatus, 
    NotFoundException, 
    Param, 
    Patch, 
    Put,
    Query,
    Res,
    UseGuards,
    UseInterceptors} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guards';
import { CustomerDto } from '../dto/customer.dto';    
import { EditarCustomerDto } from '../dto/editar-customer.dto';
import { CustomerService } from '../services/customer.service';

//Todas las rutas de este crud estan protegidas, referirse al modulo auth para acceder


@Controller('customer')
export class CustomerController {
    constructor (private customerService: CustomerService) {}

    /* @UseGuards(JwtAuthGuard) */
    @Get("/")
    async buscarCustomers(@Res() res) {
      const customers = await this.customerService.buscarCustomers();
      if (!customers) throw new NotFoundException("La base de datos esta vacia"); 
      res.status(HttpStatus.OK).json( customers );
      return customers
    }

    /* @UseGuards(JwtAuthGuard) */
    @Get("/:customerID")
    async buscarCustomer(@Param("customerID") customerID, @Res() res) {
      const customer = await this.customerService.buscarCustomer(customerID);
      if (!customer) throw new NotFoundException("Customer no encontrado");      
      return res.status(HttpStatus.OK).json( customer );      
    }
    
    /* @UseGuards(JwtAuthGuard) */
    @Patch("/editar")
    async editarCustomer(@Res() res, @Body() customerDto: EditarCustomerDto, @Query("customerID") customerID) {
      const customerEditado = await this.customerService.editarCustomer(customerID, customerDto);
      if (!customerEditado) throw new NotFoundException("Customer no encontrado");      
      return res.status(HttpStatus.OK).json({ msg: "Customer actualizado", customerEditado });
    }

    /* @UseGuards(JwtAuthGuard) */
    @Put("/actualizar")
    async actualizarCustomer(@Res() res, @Body() customerDto: EditarCustomerDto, @Query("customerID") customerID) {
      const customerActualizado = await this.customerService.actualizarCustomer(customerID, customerDto);
      if (!customerActualizado) throw new NotFoundException("Customer no encontrado");      
      return res.status(HttpStatus.OK).json({ msg: "Customer actualizado", customerActualizado });
    }

    /* @UseGuards(JwtAuthGuard) */
    @Delete("/borrar")
    async borrarCustomer (@Res() res, @Query("customerID") customerID) {
      const customerBorrado = await this.customerService.borrarCustomer(customerID);
      if (!customerBorrado) throw new NotFoundException("Customer no encontrado");      
      return res.status(HttpStatus.OK).json({ msg: "Customer borrado", customerBorrado });
    }

}
