import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { ConsumerModule } from './consumer/consumer.module';

@Module({
  imports: [ConsumerModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
