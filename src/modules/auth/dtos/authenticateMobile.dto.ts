import { IsIn, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserTypeEnum } from '../../../common/constants/common.enum';
import { OtpSendDto } from '../../../common/dtos/otpSendDto';


export class AuthenticateMobileDto extends OtpSendDto{

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(4)
    @ApiProperty()
    token: string;

}