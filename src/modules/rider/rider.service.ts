import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OtpLogs } from '../auth/entities/OtpLogs.entity';
import { OtpBasedRegistrationDto } from '../../common/dtos/otpBasedRegistrationDto';
import {
  ApprovalStatusEnum,
  UserTypeEnum,
  VerificationStatusEnum,
  VerificationType,
} from '../../common/constants/common.enum';
import { RiderProfileRequest } from './entities/RiderProfileRequest.entity';
import { MINIO_CONNECTION } from '../minio-client';
import config from '../../config';
import * as crypto from 'crypto'
import * as multer from '@nestjs/platform-express';

@Injectable()
export class RiderProfileRequestService {
  constructor(
    @Inject(MINIO_CONNECTION) private readonly minioClient,

    @InjectRepository(RiderProfileRequest)
    private riderProfileRequestService: Repository<RiderProfileRequest>,
    @InjectRepository(OtpLogs)
    private otpLogsRepository: Repository<OtpLogs>,
  ) {}

  async profileRequest(registrationDto: OtpBasedRegistrationDto, files): Promise<unknown> {

    const { full_name, otp_token, email } = registrationDto;

    const otpLog = await this.otpLogsRepository.findOne({
      where: {
        idx: otp_token,
        status: VerificationStatusEnum.ACTIVE,
        user_type: UserTypeEnum.RIDER,
        type: VerificationType.LOGIN,
      },
    });
    let front_image_name = await Date.now().toString();
    let back_image_name = await Date.now().toString();

    front_image_name = crypto.createHash('md5').update(front_image_name).digest('hex');
    back_image_name = crypto.createHash('md5').update(back_image_name).digest('hex');

    if (!otpLog) {
      throw new HttpException('Token could not be verified', HttpStatus.FORBIDDEN)

    } else {
    // await this.minioClient.putObject(config.minio.MINIO_BUCKET, front_image_name, files.front_image[0].buffer);

    const profileRequest = await this.riderProfileRequestService.save({
      full_name,
      email,
      mobile_number: otpLog.mobile_number,
      mobile_number_ext: otpLog.mobile_number_ext,
      is_completely_registered: false,
      approval_status: ApprovalStatusEnum.PENDING,
      front_image: front_image_name,
      back_image: back_image_name
    });

    await this.otpLogsRepository.save({
        id: otpLog.id,
        status: VerificationStatusEnum.EXPIRED,
      });

    return { message: 'Successfully created profile request' }
    }

  }
}