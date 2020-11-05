import { JwtService } from '@nestjs/jwt';
export declare function getUserJwtToken(user: any, jwtService: JwtService): Promise<{
    access_token: string;
    payload: {
        idx: any;
        full_name: any;
        mobile_number: any;
        mobile_number_ext: any;
    };
    expires_in: string;
}>;
