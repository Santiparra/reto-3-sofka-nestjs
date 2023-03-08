import { Module } from '@nestjs/common';
import { InvoiceController } from './controllers/invoice.controller';
import { InvoicesService } from './services/invoices.service';

@Module({
  controllers: [InvoiceController],
  providers: [InvoicesService]
})
export class InvoiceModule {}
