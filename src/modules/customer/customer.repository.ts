import { EntityRepository, Repository } from 'typeorm';
import { Customer } from './entities/Customer.entity';
import * as argon from 'argon2';
import { SetPasswordDto } from './dtos/setPasswordDto';
import { LoginPayloadDto } from '../../common/dtos/loginPayload.dto';


@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {

	async setPassword(passwordDto: SetPasswordDto) {
	  const { mobile_number, mobile_number_ext } = passwordDto;

    const customer = await this.findOne({ mobile_number, mobile_number_ext } );

    if (customer){
    const pwdHash = await argon.hash(passwordDto.password);

    await this.save(
      {
        id: customer.id,
        password: pwdHash,
        is_password_set: true
      })}

    return customer
	}


  async authenticateCustomer(loginCredentialsDto: LoginPayloadDto): Promise<Customer>{
    const { mobile_number, mobile_number_ext, password } = loginCredentialsDto;
    const customer = await this.findOne({ mobile_number, mobile_number_ext });

    if (customer && await argon.verify(customer.password, password) && customer.is_active){
      return customer
    } else {
      return null
    }

  }

}