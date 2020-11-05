import { Repository } from 'typeorm';
import { OtpLogs } from '../../auth/entities/OtpLogs.entity';
import { OtpBasedRegistrationDto } from '../../../common/dtos/otpBasedRegistrationDto';
import { CustomerRepository } from '../customer.repository';
import { JwtService } from '@nestjs/jwt';
export declare class CustomerService {
    private jwtService;
    private customerRepository;
    private otpLogsRepository;
    constructor(jwtService: JwtService, customerRepository: CustomerRepository, otpLogsRepository: Repository<OtpLogs>);
    customerRegistration(dto: OtpBasedRegistrationDto): Promise<{
        message: string;
        access_token: string;
        expires_in: string;
    }>;
}
