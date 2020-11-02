import { Column, Entity, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from '../../../common/entitities/base.entity';
import { RatingEnum } from '../../../common/constants/common.enum';
import { DeliveryRequest } from './DeliveryRequest.entity';

@Entity()
export class DeliveryRatingReview extends CustomBaseEntity {

  @ManyToOne(() => DeliveryRequest,
      delivery_request => delivery_request.reviews)
  delivery_request: DeliveryRequest;

  @Column('varchar', { length: 150, name: 'name' })
  review: string;

  @Column('varchar')
  RATING: RatingEnum;

}