import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { OtpLogs } from './entities/OtpLogs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OtpSendDto } from '../../common/dtos/otpSendDto';
import { UserTypeEnum, VerificationStatusEnum, VerificationType } from '../../common/constants/common.enum';
import { AuthenticateMobileDto } from './dtos/authenticateMobile.dto';
import { CustomerRepository } from '../customer/customer.repository';
import { getUserJwtToken } from '../../common/jwt/getUserJwtToken.helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private customerRepository: CustomerRepository;

  constructor(
    private readonly connection: Connection,

    @InjectRepository(OtpLogs)
    private otpLogsRepository: Repository<OtpLogs>,

    private jwtService:JwtService
  ) {
    this.customerRepository = this.connection.getCustomRepository(CustomerRepository);
  }

  generateToken(){
    return '111111'
  }

  async sendOtp(otpSendDto: OtpSendDto){
    // todo: expire previously sent otp if any
    // todo: ip and security validations
    // todo: sms throttling logic
    await this.otpLogsRepository.save({
      ...otpSendDto,
      token: this.generateToken(),
      type: VerificationType.LOGIN,
      status: VerificationStatusEnum.UNCLAIMED
    }).then( otpLog => {
        this.otpLogsRepository.save(
          {
            id: otpLog.id,
            is_otp_sent: true
          }
        );

      return otpLog
      });

    return { message: 'Otp Sent successfully' }
  }

  async authenticateMobile(authDto: AuthenticateMobileDto){
    const { mobile_number, mobile_number_ext } = authDto;
    // todo: otp time duration validation

    const otpLog = await this.otpLogsRepository.findOne({
      where: {
        ...authDto,
        type: VerificationType.LOGIN,
        status: VerificationStatusEnum.UNCLAIMED,
        user_type: UserTypeEnum.CUSTOMER
      }
    });

    if (otpLog){

      const customer = await this.customerRepository.findOne({
          where: { mobile_number, mobile_number_ext }
        });

      if (customer){
        const { accessToken, expires_in } = await getUserJwtToken(customer, this.jwtService);

        await this.otpLogsRepository.save({
          ...otpLog,
          status: VerificationStatusEnum.EXPIRED
        });

        return { accessToken, expires_in, user_exists: true }
      } else {

        await this.otpLogsRepository.save({
          ...otpLog,
          status: VerificationStatusEnum.ACTIVE
        });

        return { user_exists: false, token_id : otpLog.idx }
      }
    } else {
      throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST)
    }
  }

}
