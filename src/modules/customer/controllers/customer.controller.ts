import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../entities/Customer.entity';
import { ApiTags } from '@nestjs/swagger';
import { OtpBasedRegistrationDto } from '../../../common/dtos/otpBasedRegistrationDto';

@ApiTags('Customer Profile creation')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('/customer-register/')
  async customerRegistration(@Body(ValidationPipe) dto: OtpBasedRegistrationDto) {
    return await this.customerService.customerRegistration(dto)
  }

  @Post('/link-third-party-login/')
  async linkThirdPartyLogin(@Body(ValidationPipe) dto: OtpBasedRegistrationDto) {
    return await this.customerService.customerRegistration(dto)
  }
}
