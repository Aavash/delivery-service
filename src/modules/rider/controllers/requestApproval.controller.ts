import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { ProfileApprovalService } from '../services/requestApproval.service';
import { OtpBasedRegistrationDto } from '../../../common/dtos/otpBasedRegistrationDto';
import { RiderProfileCreateDto } from '../dtos/riderProfileCreate.dto';


@Controller('rider')
export class RequestApprovalController {
  constructor(
    private riderProfileRequestService: ProfileApprovalService,
  ) {}

  @Post('profile-request')
  @UseInterceptors( FileFieldsInterceptor([
    { name: 'front_image', maxCount: 1 },
    { name: 'back_image', maxCount: 1 },
  ]))
  async profileRequest(
    @UploadedFiles() files,
    @Body() registrationDto: OtpBasedRegistrationDto
  ) {
    return await this.riderProfileRequestService.profileRequest(registrationDto, files)
  }

  @Post('profile-approve')
  @UsePipes(new ValidationPipe({ validationError: { target: false } }))
  async profileApprove(
    @Body() profileCreateDto: RiderProfileCreateDto
  ) {
    return await this.riderProfileRequestService.approveRequest(profileCreateDto)
  }
}