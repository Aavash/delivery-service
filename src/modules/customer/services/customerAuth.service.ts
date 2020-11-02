import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from '../dtos/authCredentials.dto';
import { JwtService } from '@nestjs/jwt';
import { CustomerRepository } from '../customer.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SetPasswordDto } from '../dtos/setPasswordDto';
import { JwtPayload } from '../../../common/constants/jwtPayload.interface';


@Injectable()
export class CustomerAuthService {
  constructor(
    @InjectRepository(CustomerRepository)
    private userRepository: CustomerRepository,

    private jwtService:JwtService
  ) {}

  async setPassword(setPasswordDto: SetPasswordDto): Promise<{ message }> {
    if (setPasswordDto.password !== setPasswordDto.confirm_password){
      throw new HttpException('Password is not valid', HttpStatus.BAD_REQUEST)
    }

    const customer = await this.userRepository.setPassword(setPasswordDto);

    if (customer) {
      return { message: 'Successfully password set' };
    } else {
      throw new HttpException('Invalid token', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {

    const customer = await this.userRepository.authenticateCustomer(authCredentialsDto);

    if (!customer) {
      throw new UnauthorizedException('Invalid credentials')
    }
    const payload = customer as JwtPayload;
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken }
  }
}