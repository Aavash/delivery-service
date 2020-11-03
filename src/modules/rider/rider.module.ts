import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiderProfileRequest } from './entities/RiderProfileRequest.entity';
import { OtpLogs } from '../auth/entities/OtpLogs.entity';
import { RiderProfileRequestService } from './rider.service';
import { RiderProfileRequestController } from './rider.controller';
import { NestMinioModule } from '../minio-client';
import config from '../../config';

@Module({
  imports: [
    NestMinioModule.register({
			endPoint: 'localhost',
			port: config.minio.MINIO_PORT,
			useSSL: false,
			accessKey: config.minio.MINIO_ACCESSKEY,
			secretKey: config.minio.MINIO_SECRETKEY
		}),
    TypeOrmModule.forFeature([RiderProfileRequest, OtpLogs])
  ],
  controllers: [RiderProfileRequestController],
  providers: [RiderProfileRequestService]
})
export class RiderModule {}
