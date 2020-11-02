import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { OtpLogs } from './entities/OtpLogs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OtpSendDto } from '../../common/dtos/otpSendDto';
import {
  ApprovalStatusEnum,
  UserTypeEnum,
  VerificationStatusEnum,
  VerificationType,
} from '../../common/constants/common.enum';
import { AuthenticateMobileDto } from './dtos/authenticateMobile.dto';
import { CustomerRepository } from '../customer/customer.repository';
import { getUserJwtToken } from '../../common/jwt/getUserJwtToken.helper';
import { JwtService } from '@nestjs/jwt';
import { Rider } from '../rider/entities/Rider.entity';
import { RiderProfileRequest } from '../rider/entities/RiderProfileRequest.entity';

@Injectable()
export class AuthService {
  private readonly customerRepository: CustomerRepository;
  private readonly riderRepository: Repository<Rider>;
  private readonly riderProfileRequest: Repository<RiderProfileRequest>;

  constructor(
    @InjectRepository(OtpLogs)
    private otpLogsRepository: Repository<OtpLogs>,
    private jwtService:JwtService,
    private readonly connection: Connection
  ) {
    this.customerRepository = this.connection.getCustomRepository(CustomerRepository);
    this.riderRepository = this.connection.getRepository(Rider);
    this.riderProfileRequest = this.connection.getRepository(RiderProfileRequest);
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
    let userRepository = null;
    const otpLog = await this.otpLogsRepository.findOne({
      where: {
        ...authDto,
        type: VerificationType.LOGIN,
        status: VerificationStatusEnum.UNCLAIMED,
      }
    });

    if (otpLog && otpLog.user_type == UserTypeEnum.CUSTOMER){
      userRepository = this.customerRepository;
    } else if (otpLog && otpLog.user_type == UserTypeEnum.RIDER){
      userRepository = this.riderRepository;
      const pendingRiderRequest = await this.riderProfileRequest.findOne({
        where: {
          mobile_number,
          // mobile_number_ext,
          // is_completely_registered: false
        }
      });

      if (pendingRiderRequest) {
        throw new HttpException('Rider has a pending profile approval.', HttpStatus.BAD_REQUEST)
      }
    } else {
      throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST)
    }

    const user = await userRepository.findOne({
          where: { mobile_number, mobile_number_ext }
        });

    if (user){
      const { accessToken, expires_in } = await getUserJwtToken(user, this.jwtService);

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
  }

}
