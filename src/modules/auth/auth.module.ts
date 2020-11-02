import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpLogs } from './entities/OtpLogs.entity';
import { CustomerRepository } from '../customer/customer.repository';
import { Customer } from '../customer/entities/Customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OtpLogs, CustomerRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, CustomerRepository]
})
export class AuthModule {}
