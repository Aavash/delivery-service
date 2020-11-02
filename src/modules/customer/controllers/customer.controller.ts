import { Controller, Get, ValidationPipe } from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { Crud } from '@nestjsx/crud';
import { Customer } from '../entities/Customer.entity';
import { ApiTags } from '@nestjs/swagger';
import { customerCreateDto } from '../dtos/customerCreate.dto';

@ApiTags('Customer')
@Crud({
  model: {
    type: Customer

  },
  dto: {
    create: customerCreateDto
  },
  routes : {
    only: ['createOneBase', ]
  }


})
@Controller('customer')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}
}
