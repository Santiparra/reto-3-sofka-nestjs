import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from 'src/customer/customer.module';
import { CustomerSchema } from 'src/customer/schemas/customer.schema';
import { AuthController } from './controllers/auth.controller';
import { jwtConstants } from './jwtConstants';
import { AuthService } from './services/auth.service';


@Module({
  imports: [
    CustomerModule,
    MongooseModule.forFeature([
    {name: "customer", schema: CustomerSchema}
  ]),
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '2h' },
  }),
],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
