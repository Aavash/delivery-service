import { CustomBaseEntity } from '../../../common/entitities/base.entity';
import { ApprovalStatusEnum, DeliveryStatusEnum } from '../../../common/constants/common.enum';
import { Customer } from '../../customer/entities/Customer.entity';
import { Rider } from '../../rider/entities/Rider.entity';
import { PackageDeliveryLocationRequest } from './PackageDeliveryLocationRequest.entity';
import { DeliveryRatingReview } from './DeliveryRatingReview.entity';
export declare class DeliveryRequest extends CustomBaseEntity {
    title: string;
    request_note: string;
    approval_status: ApprovalStatusEnum;
    delivery_status: DeliveryStatusEnum;
    customer: Customer;
    assigned_to: Rider;
    package_locations: PackageDeliveryLocationRequest[];
    reviews: DeliveryRatingReview[];
}
