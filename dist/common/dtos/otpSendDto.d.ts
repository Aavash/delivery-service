import { UserTypeEnum } from '../constants/common.enum';
export declare class OtpSendDto {
    mobile_number_ext: string;
    mobile_number: string;
    device_id: string;
    user_type: UserTypeEnum;
}
