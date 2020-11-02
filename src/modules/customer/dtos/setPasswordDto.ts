import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetPasswordDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      { message: 'Password too weak' })
    @ApiProperty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      { message: 'Password too weak' })
    @ApiProperty()
    confirm_password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(100)
    @ApiProperty()
    token: string;

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

}