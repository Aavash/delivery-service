import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { OtpSendDto } from '../../common/dtos/otpSendDto';
import { AuthService } from './auth.service';
import { AuthenticateMobileDto } from './dtos/authenticateMobile.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Post('/send-otp/')
  async sendOtp(@Body(ValidationPipe) otpSendDto: OtpSendDto): Promise<{ message }> {
    return await this.authService.sendOtp(otpSendDto)
  }

  @Post('/authenticate-mobile/')
  async authenticateMobile(@Body(ValidationPipe) authDto: AuthenticateMobileDto): Promise<unknown> {
    return await this.authService.authenticateMobile(authDto)
  }

}
