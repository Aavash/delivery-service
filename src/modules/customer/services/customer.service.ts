import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Customer } from '../entities/Customer.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { Repository } from 'typeorm';
import { OtpLogs } from '../../auth/entities/OtpLogs.entity';
import { OtpBasedRegistrationDto } from '../../../common/dtos/otpBasedRegistrationDto';
import { UserTypeEnum, VerificationStatusEnum, VerificationType } from '../../../common/constants/common.enum';


@Injectable()
export class CustomerService extends TypeOrmCrudService<Customer> {
  constructor(
    @InjectRepository(Customer)
    repo,
    @InjectRepository(OtpLogs)
    private otpLogsRepository: Repository<OtpLogs>
  ) {
    super(repo);
  }

  async createOne(req: CrudRequest, dto: OtpBasedRegistrationDto): Promise<Customer> {
    const { full_name, otp_token, email } = dto;

    const otpLog = await this.otpLogsRepository.findOne({
      where: {
        idx: otp_token,
        status: VerificationStatusEnum.ACTIVE,
        type: VerificationType.LOGIN,
        user_type: UserTypeEnum.CUSTOMER,
      }
    });

    if (!otpLog) {
      throw new HttpException('Token could not be verified', HttpStatus.FORBIDDEN)
    } else {


    const customer = await this.repo.save({
      full_name,
      email,
      mobile_number: otpLog.mobile_number,
      mobile_number_ext: otpLog.mobile_number_ext,
      is_completely_registered: true
    });

    await this.otpLogsRepository.save({
        id: otpLog.id,
        status: VerificationStatusEnum.EXPIRED,
      });

    return customer
    }
  }
}