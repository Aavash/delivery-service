import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {

    @IsString()
    @MinLength(2)
    @MaxLength(5)
    mobile_number_ext: string;

    @IsString()
    @MinLength(8)
    @MaxLength(12)
    mobile_number: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      { message: 'Password too weak' })
    password: string;
}