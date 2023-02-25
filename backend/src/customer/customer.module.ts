import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { CustomerController } from './controllers/customer.controller';
import { CustomerSchema } from './schemas/customer.schema';
import { CustomerService } from './services/customer.service';

@Module({
  imports: [MongooseModule.forFeature([
    {name: "customer", schema: CustomerSchema}
  ])],
  exports: [CustomerService],
  controllers: [CustomerController],
  providers: [CustomerService, JwtStrategy],
})
export class CustomerModule {}
