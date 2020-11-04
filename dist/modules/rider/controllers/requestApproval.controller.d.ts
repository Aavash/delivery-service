import { ProfileApprovalService } from '../services/requestApproval.service';
import { OtpBasedRegistrationDto } from '../../../common/dtos/otpBasedRegistrationDto';
import { RiderProfileCreateDto } from '../dtos/riderProfileCreate.dto';
export declare class RequestApprovalController {
    private riderProfileRequestService;
    constructor(riderProfileRequestService: ProfileApprovalService);
    profileRequest(files: any, registrationDto: OtpBasedRegistrationDto): Promise<unknown>;
    profileApprove(profileCreateDto: RiderProfileCreateDto): Promise<{
        message: string;
    }>;
}
