import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles, Body } from '@nestjs/common';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express'
import { RiderProfileRequestService } from './rider.service';
import { OtpBasedRegistrationDto } from '../../common/dtos/otpBasedRegistrationDto';
import { BufferedFile } from '../../common/constants/file-model.image';


@Controller('rider')
export class RiderProfileRequestController {
  constructor(
    private riderProfileRequestService: RiderProfileRequestService,
  ) {}

  @Post('profile-request')
  @UseInterceptors( FileFieldsInterceptor([
    { name: 'front_image', maxCount: 1 },
    { name: 'back_image', maxCount: 1 },
  ]))
  async uploadMany(
    @UploadedFiles() files,
    @Body() registrationDto: OtpBasedRegistrationDto
  ) {
    return await this.riderProfileRequestService.profileRequest(registrationDto, files)
  }
}