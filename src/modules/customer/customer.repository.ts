import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Customer } from './entities/Customer.entity';
import * as argon from 'argon2';
import { AuthCredentialsDto } from './dtos/authCredentials.dto';
import { SetPasswordDto } from './dtos/setPasswordDto';
import { CustomerVerification } from './entities/CustomerVerification.entity';
import { VerificationStatusEnum, VerificationType } from '../../common/constants/common.enum';


@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {

	async setPassword(passwordDto: SetPasswordDto) {
	  const { token, mobile_number, mobile_number_ext, password } = passwordDto;

    const verificationRepository = getRepository(CustomerVerification);
    const customer = await this.findOne({ mobile_number, mobile_number_ext } );
    const verificationToken = await verificationRepository.findOne({
      where: {
        customer: customer,
        token: token,
        status: VerificationStatusEnum.ACTIVE,
        type: VerificationType.SET_PASSWORD
      } });


    if (verificationToken){
      const pwdHash = await argon.hash(passwordDto.password);

      await this.save(
        {
          id: customer.id,
          password: pwdHash,
          is_password_set: true
        },
      );
      await verificationRepository.save(
        {
          id: verificationToken.id,
          status: VerificationStatusEnum.EXPIRED,
        },
      );

      return customer
    } else {
      return null
    }
	}


  async authenticateCustomer(authCredentialsDto: AuthCredentialsDto): Promise<Customer>{
    const { mobile_number, mobile_number_ext, password } = authCredentialsDto;
    const customer = await this.findOne({ mobile_number, mobile_number_ext });

    if (customer && await argon.verify(customer.password, password) && customer.is_active){
      return customer
    } else {
      return null
    }

  }

}