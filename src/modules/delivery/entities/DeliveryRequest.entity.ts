import {
  Column,
  Entity, ManyToOne, OneToMany,
} from 'typeorm';
import { CustomBaseEntity } from '../../../common/typeorm/base.entity';
import {
  ApprovalStatusEnum,
  DeliveryStatusEnum,
} from '../../../common/constants/common.enum';
import { Customer } from '../../customer/entities/Customer.entity';
import { Rider } from '../../rider/entities/Rider.entity';
import { PackageDeliveryLocationRequest } from './PackageDeliveryLocationRequest.entity';
import { DeliveryRatingReview } from './DeliveryRatingReview.entity';


@Entity()
export class DeliveryRequest extends CustomBaseEntity{

  @Column('varchar', { length: 150, name: 'title' })
  title: string;

  @Column('varchar', { length: 150, name: 'name', nullable: true })
  request_note: string;

  @Column('varchar')
  approval_status: ApprovalStatusEnum;

  @Column('varchar')
  delivery_status: DeliveryStatusEnum;

  @ManyToOne(type => Customer, customer => customer.delivery_requests)
  customer: Customer;

  @ManyToOne(type => Rider,
      rider => rider.assigned_delivery_requests, { nullable: true })
  assigned_to: Rider;

  @OneToMany(() => PackageDeliveryLocationRequest, location_request => location_request.delivery_request, {
  eager: false,
  })
  package_locations: PackageDeliveryLocationRequest[];

  @OneToMany(() => DeliveryRatingReview, review => review.delivery_request, {
  eager: false,
  })
  reviews: DeliveryRatingReview[];
}