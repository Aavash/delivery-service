import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class AuthenticateMobileDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(10)
    @ApiProperty()
    token: string;

    @IsString()
    @MinLength(3)
    @MaxLength(3)
    @ApiProperty()
    mobile_number_ext: string;

    @IsString()
    @MinLength(10)
    @MaxLength(10)
    @ApiProperty()
    mobile_number: string;


}