import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { RiderModule } from './modules/rider/rider.module';
import { DeliveryModule } from './modules/delivery/delivery.module';
import { CustomerModule } from './modules/customer/customer.module';
import deliveryServiceDb from './config/typeorm/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { NestMinioModule } from './modules/minio-client';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forRoot(deliveryServiceDb),
    RiderModule,
    DeliveryModule,
    CustomerModule,
    AuthModule,
    NestMinioModule.register({
      endPoint: 'play.min.io',
      port: 9000,
      useSSL: true,
      accessKey: 'Q3AM3UQ867SPQQA43P2F',
      secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
    }),
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
