import { Test, TestingModule } from '@nestjs/testing';
import { FormSubmissionsService } from './form-submissions.service';

describe('FormSubmissionsService', () => {
  let service: FormSubmissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormSubmissionsService],
    }).compile();

    service = module.get<FormSubmissionsService>(FormSubmissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
