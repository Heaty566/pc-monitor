import { ConsumerService } from './consumer.service';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  namespace: 'pc-monitor',
  cors: {
    origin: 'http://localhost:3000',
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
