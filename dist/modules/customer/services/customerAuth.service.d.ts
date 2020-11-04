import { JwtService } from '@nestjs/jwt';
import { CustomerRepository } from '../customer.repository';
import { SetPasswordDto } from '../dtos/setPasswordDto';
import { LoginPayloadDto } from '../../../common/dtos/loginPayload.dto';
export declare class CustomerAuthService {
    private customerRepository;
    private jwtService;
    constructor(customerRepository: CustomerRepository, jwtService: JwtService);
    setPassword(setPasswordDto: SetPasswordDto): Promise<{
        message: any;
    }>;
    signIn(loginCredentialsDto: LoginPayloadDto): Promise<{
        accessToken: any;
        expires_in: any;
    }>;
}
