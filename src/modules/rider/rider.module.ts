import { Module } from '@nestjs/common';
import { RiderController } from './rider.controller';
import { RiderService } from './rider.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiderProfileRequest } from './entities/RiderProfileRequest.entity';
import { OtpLogs } from '../auth/entities/OtpLogs.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RiderProfileRequest, OtpLogs])
  ],
  controllers: [RiderController],
  providers: [RiderService]
})
export class RiderModule {}
