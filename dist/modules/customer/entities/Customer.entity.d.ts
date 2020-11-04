import { CustomBaseEntity } from '../../../common/entitities/base.entity';
import { DeliveryRequest } from '../../delivery/entities/DeliveryRequest.entity';
import { GenderEnum } from '../../../common/constants/common.enum';
export declare class Customer extends CustomBaseEntity {
    full_name: string;
    password: string | null;
    is_password_set: boolean;
    email: string;
    gender: GenderEnum;
    mobile_number_ext: string | null;
    mobile_number: string;
    date_of_birth: string | null;
    is_active: boolean | null;
    is_completely_registered: boolean;
    delivery_requests: DeliveryRequest[];
}
