import { Column, Entity, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from '../../../common/entitities/base.entity';
import { DeliveryRequest } from './DeliveryRequest.entity';
import { DeliveryStatusEnum, ObjectSensitivityEnum } from '../../../common/constants/common.enum';


@Entity()
export class PackageDeliveryLocationRequest extends CustomBaseEntity {

  @ManyToOne(() => DeliveryRequest,
      delivery_request => delivery_request.package_locations)
  delivery_request: DeliveryRequest;

  @Column('varchar', { length: 150, name: 'latitude' })
  latitude: string;

  @Column('varchar', { length: 150, name: 'longitude' })
  longitude: string | null;

  @Column('varchar', { length: 150, name: 'title' })
  title: string;

  @Column('varchar', { length: 150, name: 'request_note', nullable: true })
  request_note: string;

  @Column('boolean', { name: 'is_confidential', default: () => 'false' })
  is_confidential: boolean | null;

  @Column('varchar')
  object_sensitivity: ObjectSensitivityEnum;

  @Column('varchar')
  delivery_status: DeliveryStatusEnum;

}