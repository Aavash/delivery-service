import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { OtpSendDto } from '../../../common/dtos/otpSendDto';
import { CustomerAuthService } from '../services/customerAuth.service';
import { SetPasswordDto } from '../dtos/setPasswordDto';
import { LoginPayloadDto } from '../../../common/dtos/loginPayload.dto';

@Controller('customer-auth')
export class CustomerAuthController {

  constructor(
    private customerAuthService: CustomerAuthService
  ) {}

  // @Post('/set-password/')
  // async setPassword(@Body(ValidationPipe) authCredentialsDto: SetPasswordDto): Promise<{ message }> {
  //   return await this.customerAuthService.setPassword(authCredentialsDto)
  // }
  //
  // @Post('/signin/')
  // signIn(@Body(ValidationPipe) loginCredentialsDto: LoginPayloadDto): Promise<{accessToken, expires_in}> {
  // return this.customerAuthService.signIn(loginCredentialsDto)
  // }

}
