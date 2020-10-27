import { Module } from '@nestjs/common';
import { RiderModule } from './modules/rider/rider.module';
import { DeliveryModule } from './modules/delivery/delivery.module';
import { CustomerModule } from './modules/customer/customer.module';
import deliveryServiceDb from './config/typeorm/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(deliveryServiceDb),
    RiderModule,
    DeliveryModule,
    CustomerModule],

  controllers: [],
  providers: [],
})
export class AppModule {}
