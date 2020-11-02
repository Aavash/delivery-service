import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {

    @IsString()
    @MinLength(2)
    @MaxLength(5)
    @ApiProperty()
    mobile_number_ext: string;

    @IsString()
    @MinLength(8)
    @MaxLength(12)
    @ApiProperty()
    mobile_number: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      { message: 'Password too weak' })
    @ApiProperty()
    password: string;
}