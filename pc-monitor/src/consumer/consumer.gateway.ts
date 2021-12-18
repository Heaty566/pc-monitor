import { ConsumerService } from './consumer.service';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { config } from '../config/kafka.config';

@WebSocketGateway({
  namespace: 'pc-monitor',
  cors: {
    origin: config.clientUrl,
    credentials: true,
  },
  allowEIO3: true,
})
export class ConsumerGateway {
  constructor(private readonly consumerService: ConsumerService) {}

  @WebSocketServer()
  server: Server;

  async sendToClient() {
    this.server.emit('data', this.consumerService.getPCList());
  }
}
