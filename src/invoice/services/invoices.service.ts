import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { UpdateInvoiceDto } from '../dto/update-invoice.dto';
import { Invoice } from '../entities/invoice.entity';

@Injectable()
export class InvoicesService {

  private readonly logger = new Logger(InvoicesService.name);

  invoices: Invoice[] =[
    { numFactura: 0, fecha: "02-02-2023", vence: "02-03-2023", monto: 123 },
    { numFactura: 1, fecha: "02-01-2023", vence: "02-02-2023", monto: 1900 },
    { numFactura: 2, fecha: "02-03-2023", vence: "02-04-2023", monto: 1100 }, 
  ]  

  removeInvoice( numFactura: number ): Invoice[] {
    this.invoices = this.invoices.filter(invoice => invoice.numFactura !== numFactura);
    return this.invoices;
  }

  updateInvoice( numFactura: number, updateInvoiceDto: UpdateInvoiceDto ): Invoice {
    let invoice = this.findInvoiceByID(numFactura);
    const index = this.invoices.indexOf ( invoice );
    if ( !invoice ) throw new NotFoundException("Este Invoice no se encuentra en la base de datos");
    invoice = {...invoice, ...updateInvoiceDto};
    this.invoices.splice(index, 1, invoice);
    return invoice
  }

  replaceInvoice(numFactura: number, createInvoiceDto: CreateInvoiceDto): Invoice {
    let invoice = this.findInvoiceByID(numFactura);    
    const index = this.invoices.indexOf ( invoice );
    if ( !invoice ) this.createInvoice(createInvoiceDto);
    invoice = {...invoice, ...createInvoiceDto};
    this.invoices.splice(index, 1, invoice);
    return invoice
  }

  createInvoice( createInvoiceDto: CreateInvoiceDto ): Invoice {
    let id = this.generateId();
    let invoice = { ...createInvoiceDto, numFactura: id };    
    this.invoices.push(invoice);
    return invoice
  }

  findInvoiceByID( numFactura: number ): Invoice {
    const invoice = this.invoices.find(esto => esto.numFactura === numFactura);
    return invoice   
  }

  findAllInvoices(): Invoice[] {
    return this.invoices;
  }

  generateId(): number {
    let randomId = Math.floor(Math.random() * 101);
    this.invoices.forEach((invoice) => {
      if (invoice.numFactura === randomId) this.generateId()
    })
    return randomId
  }
  
}
