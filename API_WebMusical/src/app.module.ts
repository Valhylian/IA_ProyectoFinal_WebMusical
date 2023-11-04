import { Module } from '@nestjs/common';

import { StableDiffusionIntegrationModule } from './stable-diffusion-integration/stable-diffusion-integration.module';
import { ConfigModule } from '@nestjs/config';
import { MusicGenController } from './music-gen/music-gen.controller';
import { ChatGptAiModule } from './chat-gpt-ai/chat-gpt-ai.module';

import * as dotenv from 'dotenv';

dotenv.config(); 

@Module({
  imports: [StableDiffusionIntegrationModule, ConfigModule.forRoot(), ChatGptAiModule],
  controllers: [MusicGenController],
  providers: [],
})
export class AppModule {}
