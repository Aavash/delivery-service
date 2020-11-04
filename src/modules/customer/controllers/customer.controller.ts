import { Controller, Get, ValidationPipe } from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { Crud } from '@nestjsx/crud';
import { Customer } from '../entities/Customer.entity';
import { ApiTags } from '@nestjs/swagger';
import { OtpBasedRegistrationDto } from '../../../common/dtos/otpBasedRegistrationDto';

@ApiTags('Customer')
@Crud({
  model: {
    type: Customer

  },
  dto: {
    create: OtpBasedRegistrationDto
  },
  routes : {
    only: ['createOneBase', ]
  }


})
@Controller('customer/customer-register')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}
}
