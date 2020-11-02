import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OtpSendDto {

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

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(1000)
    @ApiProperty()
    device_id: string;

}