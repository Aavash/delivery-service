import { Connection, Repository } from 'typeorm';
import { OtpLogs } from './entities/OtpLogs.entity';
import { OtpSendDto } from '../../common/dtos/otpSendDto';
import { AuthenticateMobileDto } from './dtos/authenticateMobile.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthAPIValidators } from './auth.validator';
export declare class AuthService {
    private otpLogsRepository;
    private jwtService;
    private readonly connection;
    private readonly authValidator;
    private readonly customerRepository;
    private readonly riderRepository;
    constructor(otpLogsRepository: Repository<OtpLogs>, jwtService: JwtService, connection: Connection, authValidator: AuthAPIValidators);
    generateToken(): string;
    sendOtp(otpSendDto: OtpSendDto): Promise<{
        message: string;
    }>;
    authenticateMobile(authDto: AuthenticateMobileDto): Promise<{
        accessToken: string;
        expires_in: string;
        user_exists: boolean;
        token_id?: undefined;
    } | {
        user_exists: boolean;
        token_id: string;
        accessToken?: undefined;
        expires_in?: undefined;
    }>;
}
