import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StableDiffusionIntegrationModule } from './stable-diffusion-integration/stable-diffusion-integration.module';
import { ConfigModule } from '@nestjs/config';
import { ChatGptIaModule } from './chat-gpt-ia/chat-gpt-ia.module';

@Module({
  imports: [StableDiffusionIntegrationModule, ConfigModule.forRoot(), ChatGptIaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
