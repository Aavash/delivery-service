import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OtpSendDto } from './otpSendDto';

export class LoginPayloadDto extends OtpSendDto{

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      { message: 'Password too weak' })
    @ApiProperty()
    password: string;
}