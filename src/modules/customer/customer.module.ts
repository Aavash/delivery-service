import { Module } from '@nestjs/common';
import { CustomerService } from './services/customer.service';
import { CustomerController } from './controllers/customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerAuthController } from './controllers/customerAuth.controller';
import { CustomerAuthService } from './services/customerAuth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import config from '../../config';
import { CustomerRepository } from './customer.repository';
import { CustomerVerification } from './entities/CustomerVerification.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerRepository, CustomerVerification]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: config.secret,
      signOptions: {
        expiresIn: config.expiresIn,
      }
    }),
  ],
  controllers: [CustomerController, CustomerAuthController],
  providers: [CustomerService, CustomerAuthService]
})
export class CustomerModule {}
