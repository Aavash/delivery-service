import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiderProfileRequest } from './entities/RiderProfileRequest.entity';
import { OtpLogs } from '../auth/entities/OtpLogs.entity';
import { ProfileApprovalService } from './services/requestApproval.service';
import { RequestApprovalController } from './controllers/requestApproval.controller';
import { Rider } from './entities/Rider.entity';
import { ProfileRequestController } from './controllers/profileRequest.controller';
import { ProfileRequestService } from './services/profileRequest.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RiderProfileRequest, OtpLogs, Rider])
  ],
  controllers: [RequestApprovalController, ProfileRequestController],
  providers: [ProfileApprovalService, ProfileRequestService]
})
export class RiderModule {}
