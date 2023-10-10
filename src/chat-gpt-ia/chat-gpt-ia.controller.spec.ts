import { Test, TestingModule } from '@nestjs/testing';
import { ChatGptIaController } from './chat-gpt-ia.controller';

describe('ChatGptIaController', () => {
  let controller: ChatGptIaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatGptIaController],
    }).compile();

    controller = module.get<ChatGptIaController>(ChatGptIaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
