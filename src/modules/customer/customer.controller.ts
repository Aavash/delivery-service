import { Controller, Get } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller()
export class CustomerController {
  constructor(private readonly appService: CustomerService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
