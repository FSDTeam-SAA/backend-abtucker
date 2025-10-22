import { Test, TestingModule } from '@nestjs/testing';
import { DisplaySideController } from './display-side.controller';

describe('DisplaySideController', () => {
  let controller: DisplaySideController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DisplaySideController],
    }).compile();

    controller = module.get<DisplaySideController>(DisplaySideController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
