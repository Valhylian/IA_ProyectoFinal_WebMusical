import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StableDiffusionIntegrationModule } from './stable-diffusion-integration/stable-diffusion-integration.module';
import { ConfigModule } from '@nestjs/config';
import { MusicGenController } from './music-gen/music-gen.controller';

import * as dotenv from 'dotenv';

dotenv.config(); 

@Module({
  imports: [StableDiffusionIntegrationModule, ConfigModule.forRoot()],
  controllers: [AppController, MusicGenController],
  providers: [AppService],
})
export class AppModule {}