import { CustomBaseEntity } from '../../../common/entitities/base.entity';
import { DeliveryRequest } from './DeliveryRequest.entity';
import { DeliveryStatusEnum, ObjectSensitivityEnum } from '../../../common/constants/common.enum';
export declare class PackageDeliveryLocationRequest extends CustomBaseEntity {
    delivery_request: DeliveryRequest;
    latitude: string;
    longitude: string | null;
    title: string;
    request_note: string;
    is_confidential: boolean | null;
    object_sensitivity: ObjectSensitivityEnum;
    delivery_status: DeliveryStatusEnum;
}
