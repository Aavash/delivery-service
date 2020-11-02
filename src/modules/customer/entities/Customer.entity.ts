import {
  Column,
  Entity, OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { CustomBaseEntity } from '../../../common/typeorm/base.entity';
import { DeliveryRequest } from '../../delivery/entities/DeliveryRequest.entity';


@Entity()
export class Customer extends CustomBaseEntity{

  @Column('varchar', { length: 150, name: 'first_name' })
  first_name: string;

  @Column('varchar', { length: 150, name: 'middle_name', nullable: true })
  middle_name: string | null;

  @Column('varchar', { length: 150, name: 'last_name' })
  last_name: string;

  @Exclude({ toPlainOnly: true })
  @Column('varchar', { length: 150, name: 'password', nullable: true })
  password: string | null;

  @Column('boolean', {
  name: 'is_password_set',
  default: () => 'false',
  })
  is_password_set: boolean;

  @Column('varchar', { length: 150, name: 'email' })
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

  @OneToMany(() => DeliveryRequest, request => request.customer, {
  eager: false,
  })
  delivery_requests: DeliveryRequest[];

}