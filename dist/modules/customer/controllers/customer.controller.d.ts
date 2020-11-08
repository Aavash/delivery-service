import { CustomerService } from '../services/customer.service';
import { OtpBasedRegistrationDto } from '../../../common/dtos/otpBasedRegistrationDto';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    customerRegistration(dto: OtpBasedRegistrationDto): Promise<{
        message: string;
        access_token: string;
        expires_in: string;
    }>;
    linkThirdPartyLogin(dto: OtpBasedRegistrationDto): Promise<{
        message: string;
        access_token: string;
        expires_in: string;
    }>;
}
