import { Test, TestingModule } from '@nestjs/testing';
import { DisplaySideService } from './display-side.service';

describe('DisplaySideService', () => {
  let service: DisplaySideService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisplaySideService],
    }).compile();

    service = module.get<DisplaySideService>(DisplaySideService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
