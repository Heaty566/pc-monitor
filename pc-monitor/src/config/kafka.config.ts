import { KafkaOptions, Transport } from '@nestjs/microservices';
import { monoEnum } from 'mono-utils-core';

export const config = {
  brokerAddress:
    process.env.NODE_ENV === monoEnum.NODE_ENV_MODE.DEVELOPMENT
      ? 'localhost:29092'
      : '128.199.174.71:29092',
  clientUrl:
    process.env.NODE_ENV === monoEnum.NODE_ENV_MODE.DEVELOPMENT
      ? 'http://localhost:3000'
      : 'http://128.199.174.71:13001',
};
console.log(config);
export const kafkaOptions: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'server',
      brokers: [config.brokerAddress],
    },
    consumer: {
      groupId: 'monitor-test',
      // allowAutoTopicCreation: true,
    },
  },
};

export const PC_TOPIC = 'pc_topic';
