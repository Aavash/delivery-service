import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Customer } from '../entities/Customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OtpLogs } from '../../auth/entities/OtpLogs.entity';
import { OtpBasedRegistrationDto } from '../../../common/dtos/otpBasedRegistrationDto';
import { UserTypeEnum, VerificationStatusEnum, VerificationType } from '../../../common/constants/common.enum';
import { CustomerRepository } from '../customer.repository';
import { JwtService } from '@nestjs/jwt';
import { getUserJwtToken } from '../../../common/jwt/getUserJwtToken.helper';


@Injectable()
export class CustomerService{
  constructor(
    private jwtService:JwtService,
    @InjectRepository(Customer)
    private customerRepository: CustomerRepository,
    @InjectRepository(OtpLogs)
    private otpLogsRepository: Repository<OtpLogs>
  ) {
  }

  async customerRegistration(dto: OtpBasedRegistrationDto){
    const { full_name, otp_token, email, device_id } = dto;

    const otpLog = await this.otpLogsRepository.findOne({
      where: {
        device_id,
        idx: otp_token,
        status: VerificationStatusEnum.ACTIVE,
        type: VerificationType.LOGIN,
        user_type: UserTypeEnum.CUSTOMER,
      }
    });

    if (!otpLog) {
      throw new HttpException('Token and Device could not be verified', HttpStatus.FORBIDDEN)
    } else {


    const customer = await this.customerRepository.save({
      full_name,
      email,
      mobile_number: otpLog.mobile_number,
      mobile_number_ext: otpLog.mobile_number_ext,
      is_completely_registered: true
    });
    const { access_token, expires_in } = await getUserJwtToken(customer, this.jwtService);

    await this.otpLogsRepository.save({
        id: otpLog.id,
        status: VerificationStatusEnum.EXPIRED,
      });

    return { 'message': 'Customer Created Successfully', access_token, expires_in }
    }
  }
}