import { Module } from '@nestjs/common';
import { ChatGptIaController } from './chat-gpt-ia.controller';
import { ChatGptIaService } from './chat-gpt-ia.service';

@Module({
  controllers: [ChatGptIaController],
  providers: [ChatGptIaService]
})
export class ChatGptIaModule {}
