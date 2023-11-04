import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
const path = require('path')
const cors = require('cors');

// Configura las opciones de CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Cambia esto a tu dominio de origen
  methods: 'GET,POST', // Especifica los métodos permitidos
  optionsSuccessStatus: 204, // Responde con un 204 No Content a las solicitudes preflight
};

// Habilita CORS con las opciones configuradas


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors(corsOptions));


  await app.listen(3000);
}
bootstrap();
