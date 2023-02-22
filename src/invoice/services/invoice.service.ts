import { Injectable, NotFoundException } from '@nestjs/common';
import { Invoice } from '../types/invoice';
import { CrearInvoiceDto } from '../dto/invoice.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { InvoiceSchema } from '../schemas/invoice.schema';
import { ModificarInvoiceDto } from '../dto/modificar-invoice.dto';


@Injectable()
export class InvoiceService {
    constructor(@InjectModel("invoice") private invoiceModel: Model<Invoice>) {}

    async buscarInvoices(): Promise<Invoice[]> {
        const invoices = await this.invoiceModel.find()
        return  invoices
    }

    async buscarInvoice (numeroFactura: number): Promise<Invoice> {
        const invoice = await this.invoiceModel.findById(numeroFactura);
        return invoice
    }

    async crearInvoice (crearInvoiceDto: CrearInvoiceDto): Promise<Invoice> {
        const invoice = new this.invoiceModel(crearInvoiceDto);
        await invoice.save();
        return invoice
    }

    async editarInvoice (numeroFactura: number, editarInvoiceDto: ModificarInvoiceDto): Promise<Invoice> {
        const invoiceEditado= await this.invoiceModel
        .findByIdAndUpdate(numeroFactura, editarInvoiceDto, { new: true });
        return invoiceEditado
    }

    async actualizarInvoice (numeroFactura: number, actualizarInvoiceDto: ModificarInvoiceDto) {
        const invoiceActualizado = await this.invoiceModel
        .findByIdAndUpdate(numeroFactura, actualizarInvoiceDto)
        .setOptions({ overwrite: true, new: true })
        .populate("numFactura")
        .populate("fecha")
        .populate("vence")
        .populate("monto");
        if (!invoiceActualizado) {
            throw new NotFoundException();
          };
        return invoiceActualizado
    }

    async borrarInvoice (numeroFactura: number): Promise<Invoice> {
        const invoiceBorrado = await this.invoiceModel.findByIdAndDelete(numeroFactura);
        return invoiceBorrado
    }
}
