import { CustomBaseEntity } from '../../../common/entitities/base.entity';
import { UserTypeEnum, VerificationStatusEnum, VerificationType } from '../../../common/constants/common.enum';
export declare class OtpLogs extends CustomBaseEntity {
    mobile_number_ext: string | null;
    mobile_number: string;
    token: string | null;
    device_id: string | null;
    ip_address: string | null;
    type: VerificationType;
    status: VerificationStatusEnum;
    user_type: UserTypeEnum;
    is_otp_sent: boolean;
}
