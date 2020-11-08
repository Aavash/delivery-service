import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomerRepository } from '../customer.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SetPasswordDto } from '../dtos/setPassword.dto';
import { LoginPayloadDto } from '../../../common/dtos/loginPayload.dto';
import { getUserJwtToken } from '../../../common/jwt/getUserJwtToken.helper';


@Injectable()
export class CustomerAuthService {
  constructor(
    @InjectRepository(CustomerRepository)
    private customerRepository: CustomerRepository,

    private jwtService:JwtService
  ) {}

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

  async signIn(loginCredentialsDto: LoginPayloadDto): Promise<{access_token, expires_in}> {

    const customer = await this.customerRepository.authenticateCustomer(loginCredentialsDto);

    if (!customer) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const { access_token, expires_in } = await getUserJwtToken(customer, this.jwtService);

    return { access_token, expires_in }
  }
}