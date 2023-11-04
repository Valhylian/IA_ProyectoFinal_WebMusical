import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
const path = require('path')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  await app.listen(3000);
}
bootstrap();
