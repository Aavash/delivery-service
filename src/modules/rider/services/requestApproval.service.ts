import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OtpLogs } from '../../auth/entities/OtpLogs.entity';
import { OtpBasedRegistrationDto } from '../../../common/dtos/otpBasedRegistrationDto';
import {
  ApprovalStatusEnum,
  UserTypeEnum,
  VerificationStatusEnum,
  VerificationType,
} from '../../../common/constants/common.enum';
import { RiderProfileRequest } from '../entities/RiderProfileRequest.entity';
import { Rider } from '../entities/Rider.entity';
import { minioClient } from '../../../utils/minio.upload';

@Injectable()
export class ProfileApprovalService {
  constructor(
    @InjectRepository(Rider)
    private riderRepository: Repository<Rider>,
    @InjectRepository(RiderProfileRequest)
    private riderProfileRequestRepository: Repository<RiderProfileRequest>,
    @InjectRepository(OtpLogs)
    private otpLogsRepository: Repository<OtpLogs>,
  ) {}


  validateImage(files){
    const noImageException = new HttpException(
      'Enter both front and back verification images', HttpStatus.FORBIDDEN);

    if (!files) {
      throw noImageException
    } else if ((!files.front_image[0] || !files.back_image[0])) {
      throw noImageException
    }
  }

  async validateOtp(registrationDto: OtpBasedRegistrationDto) {
    const { otp_token, device_id } = registrationDto;

    const otpLog = await this.otpLogsRepository.findOne({
      where: {
        device_id,
        idx: otp_token,
        status: VerificationStatusEnum.ACTIVE,
        user_type: UserTypeEnum.RIDER,
        type: VerificationType.LOGIN,
      },
    });

    if (!otpLog) {
      throw new HttpException('Token and Device could not be verified', HttpStatus.FORBIDDEN)
    } else {
      return otpLog
    }

  }

  async profileRequest(registrationDto: OtpBasedRegistrationDto, files): Promise<unknown> {

    const { full_name, email } = registrationDto;

    this.validateImage(files);
    const otpLog = await this.validateOtp(registrationDto);

    const frontImagePath = await minioClient.uploadFile(files.front_image[0]);
    const backImagePath = await minioClient.uploadFile(files.back_image[0]);

    await this.riderProfileRequestRepository.save({
      full_name,
      email,
      mobile_number: otpLog.mobile_number,
      mobile_number_ext: otpLog.mobile_number_ext,
      is_completely_registered: false,
      approval_status: ApprovalStatusEnum.PENDING,
      front_image: frontImagePath,
      back_image: backImagePath
    });

    await this.otpLogsRepository.save({
        id: otpLog.id,
        status: VerificationStatusEnum.EXPIRED,
      });

    return { message: 'Successfully created profile request' }

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
          });

          return { message: 'Request has been rejected' }
        }
    }
  }
}