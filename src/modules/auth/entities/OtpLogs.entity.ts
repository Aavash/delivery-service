import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from '../../../common/entitities/base.entity';
import { UserTypeEnum, VerificationStatusEnum, VerificationType } from '../../../common/constants/common.enum';
import { Exclude } from 'class-transformer';

@Entity()
export class OtpLogs extends CustomBaseEntity{

  @Column('varchar', {
    length: 150,
    name: 'mobile_number_ext',
  })
  mobile_number_ext: string | null;

  @Column('varchar', { length: 150, name: 'mobile_number' })
  mobile_number: string;

  @Column('varchar', {
		nullable: true,
		length: 10,
		name: 'token',
	})
	token: string | null;

  @Column('varchar', {
		nullable: true,
		length: 1000,
		name: 'device_id',
	})
	device_id: string | null;

  @Column('varchar', {
		nullable: true,
		length: 100,
		name: 'ip_address',
	})
	ip_address: string | null;

  @Column('varchar')
  type: VerificationType;

  @Column('varchar')
  status: VerificationStatusEnum;

  @Column('varchar')
  user_type: UserTypeEnum;

  @Exclude({ toPlainOnly: true })
  @Column('boolean', {
  default: () => 'false',
  name: 'is_otp_sent',
  })
  is_otp_sent: boolean;
}