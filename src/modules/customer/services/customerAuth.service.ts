import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomerRepository } from '../customer.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SetPasswordDto } from '../dtos/setPasswordDto';
import { LoginPayloadDto } from '../../../common/dtos/loginPayload.dto';
import { getUserJwtToken } from '../../auth/getUserJwtToken.helper';


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

  async signIn(loginCredentialsDto: LoginPayloadDto): Promise<{accessToken, expires_in}> {

    const customer = await this.customerRepository.authenticateCustomer(loginCredentialsDto);

    if (!customer) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const { accessToken, expires_in } = await getUserJwtToken(customer);

    return { accessToken, expires_in }
  }
}