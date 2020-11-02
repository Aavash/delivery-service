import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Customer } from './entities/Customer.entity';
import * as argon from 'argon2';
import { AuthCredentialsDto } from './dtos/authCredentials.dto';
import { SetPasswordDto } from './dtos/setPasswordDto';
import { CustomerVerification } from './entities/CustomerVerification.entity';


@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer>{

	async setPassword(passwordDto: SetPasswordDto) {
	  const { token } = passwordDto;

    const verificationRepository = getRepository(CustomerVerification);
    const verificationToken = await verificationRepository.findOne({ token });

    if (verificationToken){
      const pwdHash = await argon.hash(passwordDto.password);

      await this.save(
        {
          idx: verificationToken.customer.idx,
          password: pwdHash
        },
      );

      return verificationToken.customer
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