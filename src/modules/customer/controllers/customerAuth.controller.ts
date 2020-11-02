import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialsDto } from '../dtos/authCredentials.dto';
import { CustomerAuthService } from '../services/customerAuth.service';
import { SetPasswordDto } from '../dtos/setPasswordDto';

@Controller('customer-auth')
export class CustomerAuthController {

  constructor(
    private customerAuthService: CustomerAuthService
  ) {}

  @Post('/set-password/')
  async setPassword(@Body(ValidationPipe) authCredentialsDto: SetPasswordDto): Promise<{ message }> {
    return await this.customerAuthService.setPassword(authCredentialsDto)
  }

  @Post('/signin/')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
  return this.customerAuthService.signIn(authCredentialsDto)
  }

}
