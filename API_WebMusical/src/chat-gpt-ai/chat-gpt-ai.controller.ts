import { Body, Controller, Post, UseInterceptors, Res } from '@nestjs/common';
import { ChatGptAiService } from './chat-gpt-ai.service';
import { GetAiModelAnswer } from './get-ai-model-answer';

@Controller('chat-gpt-ai')
export class ChatGptAiController {
    constructor (private readonly service:ChatGptAiService){

    }

    @Post("/mesagge")
    getModelAnswer(@Body() data:GetAiModelAnswer){
        console.log(data.question)
        return this.service.getModelAnswer(data.question)
    }
}
