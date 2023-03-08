import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from 'nestjs-pino';
import { CorrelationIdMiddleware } from './middlewares/correlation-id/correlation-id.middleware';
import { loggerConfig } from './logger/logger-conf';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { CustomerModule } from './customer/customer.module';
import { InvoiceModule } from './invoice/items.module';


@Module({
  imports: [
    CustomerModule, 
    InvoiceModule, 
    AuthModule, 
    LoggerModule.forRoot(loggerConfig),
  ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes("*");
  }
}
