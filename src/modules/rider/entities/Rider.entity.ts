import {
  Column,
  Entity, JoinColumn, OneToMany, OneToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { CustomBaseEntity } from '../../../common/entitities/base.entity';
import { DeliveryRequest } from '../../delivery/entities/DeliveryRequest.entity';
import { RiderProfileRequest } from './RiderProfileRequest.entity';


@Entity()
export class Rider extends CustomBaseEntity{

  @OneToOne(() => RiderProfileRequest,
      rider_request => rider_request.rider )
  @JoinColumn()
  profile_request: RiderProfileRequest;

  @Column('varchar', { length: 150, name: 'first_name' })
  full_name: string;

  @Exclude({ toPlainOnly: true })
  @Column('varchar', { length: 150, name: 'password', nullable: true })
  password: string | null;

  @Column('boolean', {
  name: 'is_password_set',
  default: () => 'false',
  })
  is_password_set: boolean;

  @Column('varchar', { length: 150, name: 'email', nullable: true })
  email: string;

  @Column('varchar', { length: 150, name: 'gender', nullable: true })
  gender: string | null;

  @Column('varchar', {
    length: 150,
    name: 'mobile_number_ext',
  })
  mobile_number_ext: string | null;

  @Column('varchar', { length: 150, name: 'mobile_number' })
  mobile_number: string;

  @Column('date', { name: 'date_of_birth', nullable: true })
  date_of_birth: string | null;

  @Column('boolean', {
  name: 'is_active',
  default: () => 'true',
  })
  is_active: boolean | null;

  @Column('boolean', {
  default: () => 'false',
  name: 'is_completely_registered',
  })
  is_completely_registered: boolean;

  @Column('boolean', {
    default: () => 'false',
    name: 'can_deliver_fragile',
    })
  can_deliver_fragile: boolean;

  @Column('boolean', {
    default: () => 'false',
    name: 'can_deliver_sensitive',
    })
  can_deliver_sensitive: boolean;

  @OneToMany(() => DeliveryRequest, request => request.customer, {
  eager: false,
  })
  assigned_delivery_requests: DeliveryRequest[];

  @Column('varchar', { length: 1000, name: 'front_image' })
  front_image: string;

  @Column('varchar', { length: 1000, name: 'back_image' })
  back_image: string;
}