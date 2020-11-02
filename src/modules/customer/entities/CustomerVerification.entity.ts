import {
	Column,
	Entity, JoinColumn,
	ManyToOne,
} from 'typeorm';
import { CustomBaseEntity } from '../../../common/typeorm/base.entity';
import { VerificationStatusEnum, VerificationType } from '../../../common/constants/common.enum';
import { Customer } from './Customer.entity';


@Entity()
export class CustomerVerification extends CustomBaseEntity{
  @ManyToOne(() => Customer)
	@JoinColumn({ name: 'customerId' })
  customer: Customer;

  @Column('varchar', {
		nullable: true,
		length: 300,
		name: 'token',
	})
	token: string | null;

  @Column('varchar')
  type: VerificationType;

  @Column('varchar')
  status: VerificationStatusEnum;
}
