import {
	Column,
	Entity,
	ManyToOne,
} from 'typeorm';
import { CustomBaseEntity } from '../../../common/typeorm/base.entity';
import { VerificationStatusEnum } from '../../../common/constants/common.enum';
import { Customer } from './Customer.entity';


@Entity()
export class CustomerVerification extends CustomBaseEntity{
  @ManyToOne(() => CustomerVerification)
  customer: Customer;

	@Column('varchar', {
		nullable: true,
		length: 300,
		name: 'token',
	})
	token: string | null;

	@Column('varchar', {
		nullable: true,
		length: 300,
		name: 'token',
	})
	type: string | null;

  @Column('varchar')
  status: VerificationStatusEnum;
}
