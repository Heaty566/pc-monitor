import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { PC } from './pc.entity';
import { kafkaOptions, PC_TOPIC } from '../config/kafka.config';
import {
  Client,
  ClientKafka,
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';
import * as _ from 'lodash';

import { monoLogger } from 'mono-utils-core';
import { ConsumerGateway } from './consumer.gateway';
const NS = 'app-consumer';

@Controller()
export class ConsumerController implements OnModuleInit {
  constructor(
    private readonly ConsumerService: ConsumerService,
    private readonly ConsumerGateway: ConsumerGateway,
  ) {}

  @Client(kafkaOptions)
  client: ClientKafka;

  onModuleInit() {
    this.client.subscribeToResponseOf(PC_TOPIC);

    monoLogger.log(NS, 'init-consumer');
    monoLogger.log(NS, 'ready to stream data');
  }

  @EventPattern(PC_TOPIC)
  async handleConsumerPC(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const value = _.get(context.getMessage(), 'value', {}) as PC;
    this.ConsumerService.setPCList(value);
    await this.ConsumerGateway.sendToClient();
    monoLogger.log(`${NS}-${value.pcId}`, 'send-data');
  }
}
