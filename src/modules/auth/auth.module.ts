import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpLogs } from './entities/OtpLogs.entity';
import { CustomerRepository } from '../customer/customer.repository';
import { JwtModule } from '@nestjs/jwt';
import config from '../../config';

@Module({
  imports: [
    TypeOrmModule.forFeature([OtpLogs, CustomerRepository]),
    JwtModule.register({
      secret: config.secret,
      signOptions: {
        expiresIn: config.expiresIn,
      }
    }),

  ],
  controllers: [AuthController],
  providers: [AuthService, CustomerRepository]
})
export class AuthModule {}
