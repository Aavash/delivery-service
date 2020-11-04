import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsUUID } from 'class-validator';
import { ApprovalStatusEnum } from '../../../common/constants/common.enum';


export class RiderProfileCreateDto {

  @ApiProperty()
  @IsUUID()
  request_idx: string;

  @ApiProperty()
  @IsIn(['APPROVED', 'REJECTED'])
  approval_status: ApprovalStatusEnum;

  @ApiProperty()
  @IsOptional()
  approval_quote: string;
}