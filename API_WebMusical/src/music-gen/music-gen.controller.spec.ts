import { Test, TestingModule } from '@nestjs/testing';
import { MusicGenController } from './music-gen.controller';

describe('MusicGenController', () => {
  let controller: MusicGenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicGenController],
    }).compile();

    controller = module.get<MusicGenController>(MusicGenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
