import { Module } from '@nestjs/common';
import { InvoiceController } from './controllers/invoice.controller';
import { InvoiceService } from './services/invoice.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceSchema } from './schemas/invoice.schema';



@Module({
  imports: [MongooseModule.forFeature([
    {name: "invoice", schema: InvoiceSchema}
  ])],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
