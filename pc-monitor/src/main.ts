import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config, kafkaOptions } from './config/kafka.config';
import { monoLogger } from 'mono-utils-core';
import { NextFunction } from 'express';
import { Request, Response } from 'express';
const NS = 'app-main';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.enableCors({ origin: config.clientUrl, credentials: true });
  app.connectMicroservice(kafkaOptions);
  app.use((req: Request, res: Response, next: NextFunction) => {
    //set header
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  await app.startAllMicroservices();
  const PORT = process.env.PORT || 4000;
  await app.listen(PORT, () => {
    monoLogger.log(NS, `app is listening on port ${PORT}`);
  });
}
bootstrap();
