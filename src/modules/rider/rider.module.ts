import { Module } from '@nestjs/common';
import { RiderController } from './rider.controller';
import { RiderService } from './rider.service';

@Module({
  controllers: [RiderController],
  providers: [RiderService]
})
export class RiderModule {}
