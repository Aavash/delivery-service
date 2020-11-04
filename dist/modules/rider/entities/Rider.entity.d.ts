import { CustomBaseEntity } from '../../../common/entitities/base.entity';
import { DeliveryRequest } from '../../delivery/entities/DeliveryRequest.entity';
import { RiderProfileRequest } from './RiderProfileRequest.entity';
export declare class Rider extends CustomBaseEntity {
    profile_request: RiderProfileRequest;
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
    can_deliver_fragile: boolean;
    can_deliver_sensitive: boolean;
    assigned_delivery_requests: DeliveryRequest[];
    front_image: string;
    back_image: string;
}
