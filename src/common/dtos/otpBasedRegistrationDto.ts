import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength, IsOptional, IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';



export class OtpBasedRegistrationDto {
  @ApiProperty()
  @IsUUID()
  otp_token: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  full_name: string;

  @ApiProperty()
  @IsEmail()
  @MinLength(3)
  @MaxLength(50)
  @IsOptional()
  email: string;
}