import { 
    Body,
    Controller, 
    Delete, 
    Get, 
    HttpStatus, 
    NotFoundException, 
    Param, 
    Patch, 
    Post, 
    Put,
    Query,
    Res,
    UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guards';
import { CrearInvoiceDto } from '../dto/invoice.dto';
import { ModificarInvoiceDto } from '../dto/modificar-invoice.dto';
import { InvoiceService } from '../services/invoice.service';


//Todas las rutas de este crud estan protegidas, referirse al modulo auth para acceder

@Controller('invoice')
export class InvoiceController {
    constructor (private invoiceService: InvoiceService) {}

    @UseGuards(JwtAuthGuard)
    @Get("/")
    async buscarInvoices(@Res() res) {
      const invoices = await this.invoiceService.buscarInvoices();
      if (!invoices) throw new NotFoundException("La base de datos de Invoice esta vacia"); 
      res.status(HttpStatus.OK).json({ msg: "invoices", invoices });
      return invoices
    }

    @UseGuards(JwtAuthGuard)
    @Get("/:invoiceID")
    async buscarInvoice(@Param("invoiceID") invoiceID, @Res() res) {
      const invoice = await this.invoiceService.borrarInvoice(invoiceID);
      if (!invoice) throw new NotFoundException("Invoice no encontrado");      
      return res.status(HttpStatus.OK).json({ msg: "invoice", invoice });      
    }
    
    @UseGuards(JwtAuthGuard)
    @Post("/crear")
    async crearInvoice(@Res() res, @Body() crearInvoiceDto: CrearInvoiceDto) {
      const invoiceCreado = await this.invoiceService.crearInvoice(crearInvoiceDto);      
      res.status(HttpStatus.OK).json({ msg: "invoice creado", invoiceCreado });
      return invoiceCreado
    }

    @UseGuards(JwtAuthGuard)
    @Patch("/editar")
    async editarInvoice(@Res() res, @Body() editarInvoiceDto: ModificarInvoiceDto, @Query("invoiceID") invoiceID) {
      const invoiceEditado = await this.invoiceService.editarInvoice(invoiceID, editarInvoiceDto);
      if (!invoiceEditado) throw new NotFoundException("Invoice no encontrado");      
      return res.status(HttpStatus.OK).json({ msg: "invoice actualizado", invoiceEditado });
    }

    @UseGuards(JwtAuthGuard)
    @Put("/actualizar")
    async actualizarInvoice(@Res() res, @Body() actualizarInvoiceDto: ModificarInvoiceDto, @Query("invoiceID") invoiceID) {
      const invoiceActualizado = await this.invoiceService.actualizarInvoice(invoiceID, actualizarInvoiceDto);
      if (!invoiceActualizado) throw new NotFoundException("Invoice no encontrado");      
      return res.status(HttpStatus.OK).json({ msg: "invoice actualizado", invoiceActualizado });
    }

    @UseGuards(JwtAuthGuard)
    @Delete("/borrar")
    async borrarInvoice (@Res() res, @Query("invoiceID") invoiceID) {
      const invoiceBorrado = await this.invoiceService.borrarInvoice(invoiceID);
      if (!invoiceBorrado) throw new NotFoundException("Invoice no encontrado");      
      return res.status(HttpStatus.OK).json({ msg: "invoice borrado", invoiceBorrado });
    }

}
