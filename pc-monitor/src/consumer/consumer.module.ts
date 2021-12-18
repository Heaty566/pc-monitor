import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ConsumerGateway } from './consumer.gateway';
import { ConsumerController } from './consumer.controller';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [ConsumerController],
  providers: [ConsumerService, ConsumerGateway],
})
export class ConsumerModule {}
