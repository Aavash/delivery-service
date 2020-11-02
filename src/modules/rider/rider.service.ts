import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { Repository } from 'typeorm';
import { OtpLogs } from '../auth/entities/OtpLogs.entity';
import { OtpBasedRegistrationDto } from '../../common/dtos/otpBasedRegistrationDto';
import { ApprovalStatusEnum, UserTypeEnum, VerificationStatusEnum } from '../../common/constants/common.enum';
import { RiderProfileRequest } from './entities/RiderProfileRequest.entity';


@Injectable()
export class RiderService extends TypeOrmCrudService<RiderProfileRequest> {
  constructor(
    @InjectRepository(RiderProfileRequest)
    repo,
    @InjectRepository(OtpLogs)
    private otpLogsRepository: Repository<OtpLogs>
  ) {
    super(repo);
  }

  async createOne(req: CrudRequest, dto: OtpBasedRegistrationDto): Promise<RiderProfileRequest> {

    const { full_name, otpToken, email } = dto;

    const otpLog = await this.otpLogsRepository.findOne({
      where: {
        idx: otpToken,
        status: VerificationStatusEnum.ACTIVE,
        user_type: UserTypeEnum.RIDER,
      }
    });

    if (!otpLog) {
      throw new HttpException('Token could not be verified', HttpStatus.FORBIDDEN)
    } else {


    const rider = await this.repo.save({
      full_name,
      email,
      mobile_number: otpLog.mobile_number,
      mobile_number_ext: otpLog.mobile_number_ext,
      is_completely_registered: false,
      approval_status: ApprovalStatusEnum.PENDING
    });

    await this.otpLogsRepository.save({
        id: otpLog.id,
        status: VerificationStatusEnum.EXPIRED,
      });

    return rider
    }

  }
}