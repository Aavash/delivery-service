import { Repository } from 'typeorm';
import { OtpLogs } from '../../auth/entities/OtpLogs.entity';
import { OtpBasedRegistrationDto } from '../../../common/dtos/otpBasedRegistrationDto';
import { RiderProfileRequest } from '../entities/RiderProfileRequest.entity';
import { Rider } from '../entities/Rider.entity';
export declare class ProfileApprovalService {
    private riderRepository;
    private riderProfileRequestRepository;
    private otpLogsRepository;
    constructor(riderRepository: Repository<Rider>, riderProfileRequestRepository: Repository<RiderProfileRequest>, otpLogsRepository: Repository<OtpLogs>);
    profileRequest(registrationDto: OtpBasedRegistrationDto, files: any): Promise<unknown>;
    approveRequest(profileCreateDto: any): Promise<{
        message: string;
    }>;
}
