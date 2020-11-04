import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiderProfileRequest } from './entities/RiderProfileRequest.entity';
import { OtpLogs } from '../auth/entities/OtpLogs.entity';
import { RiderProfileRequestService } from './services/profileRequest.service';
import { RiderProfileRequestController } from './controllers/profileRequest.controller';
import { NestMinioModule } from '../minio-client';
import config from '../../config';
import { Rider } from './entities/Rider.entity';

@Module({
  imports: [
    NestMinioModule.register({
			endPoint: 'localhost',
			port: config.minio.MINIO_PORT,
			useSSL: false,
			accessKey: config.minio.MINIO_ACCESSKEY,
			secretKey: config.minio.MINIO_SECRETKEY
		}),
    TypeOrmModule.forFeature([RiderProfileRequest, OtpLogs, Rider])
  ],
  controllers: [RiderProfileRequestController],
  providers: [RiderProfileRequestService]
})
export class RiderModule {}
