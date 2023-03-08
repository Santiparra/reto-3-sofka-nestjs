import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  HttpStatus, 
  Logger, 
  NotFoundException, 
  Param, 
  ParseIntPipe, 
  Patch, 
  Post, 
  Put, 
  Res, 
  UsePipes, 
  ValidationPipe 
} from '@nestjs/common';
import { Role } from 'src/customer/entities/roles.enum';
import { Roles } from 'src/utils/roles.decorator';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { UpdateInvoiceDto } from '../dto/update-invoice.dto';
import { Invoice } from '../entities/invoice.entity';
import { InvoicesService } from '../services/invoices.service';

@Controller('invoices')
export class InvoiceController {

  private readonly logger = new Logger(InvoiceController.name);

  constructor(private readonly invoiceService: InvoicesService) {}

  @Get()
  findAllInvoices( @Res() res ): Invoice[] {
    const invoices = this.invoiceService.findAllInvoices();
    if (!invoices) throw new NotFoundException("La base de datos para Invoices no se encuentra"); 
    return res.status(HttpStatus.OK).json({ msg: "Invoices:", invoices });
  }

  @Get(":id")
  findInvoiceByID( @Param("id", ParseIntPipe) id: number ): Invoice {
    return this.invoiceService.findInvoiceByID(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  @UsePipes(new ValidationPipe({ whitelist: true })) 
  createInvoice( @Body() createInvoiceDto: CreateInvoiceDto,  @Res() res ): Invoice {
    const createdInvoice = this.invoiceService.createInvoice(createInvoiceDto);
    return res.status(HttpStatus.OK).json({ msg: "Invoice creado con éxito:", createdInvoice });
  }
  
  @Patch(":id")
  @Roles(Role.ADMIN)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateInvoice( 
    @Param("id", ParseIntPipe) id: number, 
    @Body() updateInvoiceDto: UpdateInvoiceDto,  
    @Res() res 
  ): Invoice[] {
    const editedInvoice = this.invoiceService.updateInvoice(id, updateInvoiceDto);   
    return res.status(HttpStatus.OK).json({ msg: "Invoice editado con éxito:", editedInvoice });    
  }

  @Put(":id")
  @Roles(Role.ADMIN)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  replaceInvoice( 
    @Param("id", ParseIntPipe) id: number, 
    @Body() createInvoiceDto: CreateInvoiceDto,  
    @Res() res )
  : Invoice {
    const replacedInvoice = this.invoiceService.replaceInvoice(id, createInvoiceDto);
    return res.status(HttpStatus.OK).json({ msg: "Invoice actualizado o editado con éxito:", replacedInvoice }); 
  }

  @Delete(":id")
  @Roles(Role.ADMIN)
  removeInvoice( @Param("id", ParseIntPipe) id: number, @Res() res ): Invoice {
    const deletedInvoice= this.invoiceService.removeInvoice(id);
    if ( !deletedInvoice ) throw new NotFoundException("Este Invoice no existe");      
    return res.status(HttpStatus.OK).json({ msg: "El Invoice ya no se encuentra en la base de datos", deletedInvoice });
  }

}
