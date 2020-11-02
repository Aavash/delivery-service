import {
  IsEmail,
  IsIn,
  IsString,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsDateString,
  IsNumberString, IsDate, Matches, IsOptional, IsUUID,
} from 'class-validator';
import { GenderEnum } from '../../../common/constants/common.enum';
import { ApiProperty } from '@nestjs/swagger';


export class customerCreateDto {
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

  // @ApiProperty()
  // @IsString()
  // @IsIn([GenderEnum.MALE, GenderEnum.FEMALE, GenderEnum.OTHERS])
  // @IsOptional()
  // gender: GenderEnum;
  //
  // @ApiProperty()
  // @IsNumberString()
  // @MinLength(8)
  // @MaxLength(12)
  // mobile_number: string;
  //
  // @ApiProperty()
  // @IsNumberString()
  // @MinLength(2)
  // @MaxLength(5)
  // mobile_number_ext: string;
  //
  // @ApiProperty()
	// @IsNotEmpty({ message: 'Date of birth is required' })
	// @Matches(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/, {
	// // @Matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/, {
	// 	message: 'Expiry date must of format dd/mm/yyyy',
	// })
  // // @IsDateString()
  // date_of_birth: string
}