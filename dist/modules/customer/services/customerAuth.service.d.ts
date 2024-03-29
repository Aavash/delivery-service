import { JwtService } from '@nestjs/jwt';
import { CustomerRepository } from '../customer.repository';
import { SetPasswordDto } from '../dtos/setPassword.dto';
import { LoginPayloadDto } from '../../../common/dtos/loginPayload.dto';
export declare class CustomerAuthService {
    private customerRepository;
    private jwtService;
    constructor(customerRepository: CustomerRepository, jwtService: JwtService);
    setPassword(setPasswordDto: SetPasswordDto): Promise<{
        message: any;
    }>;
    signIn(loginCredentialsDto: LoginPayloadDto): Promise<{
        access_token: any;
        expires_in: any;
    }>;
}
