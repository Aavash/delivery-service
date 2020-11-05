import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { OtpLogs } from '../../auth/entities/OtpLogs.entity';
import { OtpBasedRegistrationDto } from '../../../common/dtos/otpBasedRegistrationDto';
import {
  ApprovalStatusEnum,
  UserTypeEnum,
  VerificationStatusEnum,
  VerificationType,
} from '../../../common/constants/common.enum';
import { RiderProfileRequest } from '../entities/RiderProfileRequest.entity';
import * as crypto from 'crypto';
import { Rider } from '../entities/Rider.entity';

@Injectable()
export class ProfileApprovalService {
  constructor(
    // @Inject(MINIO_CONNECTION) private readonly minioClient,
    @InjectRepository(Rider)
    private riderRepository: Repository<Rider>,
    @InjectRepository(RiderProfileRequest)
    private riderProfileRequestRepository: Repository<RiderProfileRequest>,
    @InjectRepository(OtpLogs)
    private otpLogsRepository: Repository<OtpLogs>,
  ) {}

  async profileRequest(registrationDto: OtpBasedRegistrationDto, files): Promise<unknown> {

    const { full_name, otp_token, email, device_id } = registrationDto;

    const otpLog = await this.otpLogsRepository.findOne({
      where: {
        device_id,
        idx: otp_token,
        status: VerificationStatusEnum.ACTIVE,
        user_type: UserTypeEnum.RIDER,
        type: VerificationType.LOGIN,
      },
    });
    let front_image_name = Date.now().toString();
    let back_image_name = Date.now().toString();

    front_image_name = crypto.createHash('md5').update(front_image_name).digest('hex');
    back_image_name = crypto.createHash('md5').update(back_image_name).digest('hex');

    if (!files.front_image[0] || !files.front_image[0]) {
      throw new HttpException('Enter both front and back images', HttpStatus.FORBIDDEN)
    }

    if (!otpLog) {
      throw new HttpException('Token and Device could not be verified', HttpStatus.FORBIDDEN)

    } else {
    // await this.minioClient.putObject(config.minio.MINIO_BUCKET, front_image_name, files.front_image[0].buffer);

    await this.riderProfileRequestRepository.save({
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


  async approveRequest(profileCreateDto){
    const request_idx = profileCreateDto.request_idx;

    const profileRequest = await this.riderProfileRequestRepository.findOne({
      where:  {
        idx: request_idx,
        approval_status: ApprovalStatusEnum.PENDING
      }
    });

    if (!profileRequest){
      throw new HttpException('Pending rofile request does not exists', HttpStatus.BAD_REQUEST)
    } else if (profileRequest.rider){
      throw new HttpException('Rider has already been approved', HttpStatus.BAD_REQUEST)
    }
    else {
      if (profileCreateDto.approval_status === ApprovalStatusEnum.APPROVED){
        const rider = await this.riderRepository.save({
          profile_request: profileRequest,
          full_name: profileRequest.full_name,
          mobile_number_ext: profileRequest.mobile_number_ext,
          mobile_number: profileRequest.mobile_number,
          front_image: profileRequest.front_image,
          back_image: profileRequest.back_image,
          can_deliver_fragile: false,
          can_deliver_sensitive: false,
          is_active: true,
          is_completely_registered: true
        });

        if (rider) {
          await this.riderProfileRequestRepository.save({
            id: profileRequest.id,
            approval_status: profileCreateDto.approval_status,
            approval_quote: profileCreateDto.approval_quote,
          });

          return { message: 'Rider Successfully Created' }
        }
      } else {
          await this.riderProfileRequestRepository.save({
            id: profileRequest.id,
            approval_status: profileCreateDto.approval_status,
            approval_quote: profileCreateDto.approval_quote,
            // ...profileRequest
          });

          return { message: 'Request has been rejected' }
        }
    }
  }
}