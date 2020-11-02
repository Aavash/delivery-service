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
  otpToken: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  full_name: string;

  @ApiProperty()
  @IsEmail()
  @MinLength(4)
  @MaxLength(100)
  @IsOptional()
  email: string;
}