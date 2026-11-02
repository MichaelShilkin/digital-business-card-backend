import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3005;

  await app.listen(port);
  Logger.log(`GraphQL Sandbox: http://localhost:${port}/graphql`, 'Bootstrap');
}
bootstrap();
