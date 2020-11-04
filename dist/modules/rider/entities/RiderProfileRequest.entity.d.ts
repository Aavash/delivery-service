import { CustomBaseEntity } from '../../../common/entitities/base.entity';
import { ApprovalStatusEnum } from '../../../common/constants/common.enum';
import { Rider } from './Rider.entity';
export declare class RiderProfileRequest extends CustomBaseEntity {
    rider: Rider;
    full_name: string;
    password: string | null;
    is_password_set: boolean;
    email: string;
    gender: string | null;
    mobile_number_ext: string | null;
    mobile_number: string;
    date_of_birth: string | null;
    is_active: boolean | null;
    is_completely_registered: boolean;
    approval_status: ApprovalStatusEnum;
    approval_quote: string;
    front_image: string;
    back_image: string;
}
