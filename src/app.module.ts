import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { RiderModule } from './modules/rider/rider.module';
import { DeliveryModule } from './modules/delivery/delivery.module';
import { CustomerModule } from './modules/customer/customer.module';
import deliveryServiceDb from './config/typeorm/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forRoot(deliveryServiceDb),
    RiderModule,
    DeliveryModule,
    CustomerModule,
    AuthModule,
    MulterModule.register({
      dest: '/data',
    })
  ],

  controllers: [],
  providers: [],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(LoggerMiddleware)
			.forRoutes({ path: '*', method: RequestMethod.ALL });
		// consumer
		// 	.apply(AuthMiddleWare)
		// 	.forRoutes(
		// 		{ path: '/path/', method: RequestMethod.ALL },
		// 	);
	}
}
