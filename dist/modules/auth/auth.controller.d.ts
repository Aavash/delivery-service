import { OtpSendDto } from '../../common/dtos/otpSendDto';
import { AuthService } from './auth.service';
import { AuthenticateMobileDto } from './dtos/authenticateMobile.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    sendOtp(otpSendDto: OtpSendDto): Promise<{
        message: any;
    }>;
    authenticateMobile(authDto: AuthenticateMobileDto): Promise<unknown>;
}
