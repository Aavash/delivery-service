import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from '../dtos/authCredentials.dto';
import { JwtService } from '@nestjs/jwt';
import { CustomerRepository } from '../customer.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SetPasswordDto } from '../dtos/setPasswordDto';
import { JwtPayload } from '../../../common/constants/jwtPayload.interface';
import { Customer } from '../entities/Customer.entity';


@Injectable()
export class CustomerAuthService {
  constructor(
    @InjectRepository(CustomerRepository)
    private customerRepository: CustomerRepository,

    private jwtService:JwtService
  ) {}

  public async createResponsePayload(customer: Customer) {
		// payload for the jwt

		const payload = {
      idx: customer.idx,
      email: customer.email,
      mobile_number: customer.mobile_number,
      mobile_number_ext: customer.mobile_number_ext,
		};

		const accessToken = this.jwtService.sign(payload, {
			expiresIn: '30d',
		});

		const {
			id,
			idx,
			first_name,
			middle_name,
			last_name,
			email,
		} = customer;


		const response = {
			id,
			idx,
			first_name,
			middle_name,
			last_name,
			email
		};

		// data sent after successful login

		return { accessToken, response };
	}

  async setPassword(setPasswordDto: SetPasswordDto): Promise<{ message }> {
    if (setPasswordDto.password !== setPasswordDto.confirm_password){
      throw new HttpException('Password is not valid', HttpStatus.BAD_REQUEST)
    }

    const customer = await this.customerRepository.setPassword(setPasswordDto);

    if (customer) {
      return { message: 'Password was set successfully' };
    } else {
      throw new HttpException('Invalid or Expired Token', HttpStatus.BAD_REQUEST)
    }

  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {

    const customer = await this.customerRepository.authenticateCustomer(authCredentialsDto);

    if (!customer) {
      throw new UnauthorizedException('Invalid credentials')
    }
    const payload = customer as JwtPayload;
    // console.log(payload);
    // const accessToken = await this.jwtService.sign(customer.mobile_number);
    //
    // return { accessToken }

    const { accessToken } = await this.createResponsePayload(customer);

    return { accessToken }
  }
}