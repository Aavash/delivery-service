import { CustomBaseEntity } from '../../../common/entitities/base.entity';
import { RatingEnum } from '../../../common/constants/common.enum';
import { DeliveryRequest } from './DeliveryRequest.entity';
export declare class DeliveryRatingReview extends CustomBaseEntity {
    delivery_request: DeliveryRequest;
    review: string;
    RATING: RatingEnum;
}
