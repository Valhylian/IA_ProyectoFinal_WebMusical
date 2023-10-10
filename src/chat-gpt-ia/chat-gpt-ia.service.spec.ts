import { Test, TestingModule } from '@nestjs/testing';
import { ChatGptIaService } from './chat-gpt-ia.service';

describe('ChatGptIaService', () => {
  let service: ChatGptIaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatGptIaService],
    }).compile();

    service = module.get<ChatGptIaService>(ChatGptIaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
