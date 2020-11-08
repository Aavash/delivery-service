import { Repository } from 'typeorm';
import { Customer } from './entities/Customer.entity';
import { SetPasswordDto } from './dtos/setPassword.dto';
import { LoginPayloadDto } from '../../common/dtos/loginPayload.dto';
export declare class CustomerRepository extends Repository<Customer> {
    setPassword(passwordDto: SetPasswordDto): Promise<Customer>;
    authenticateCustomer(loginCredentialsDto: LoginPayloadDto): Promise<Customer>;
}
