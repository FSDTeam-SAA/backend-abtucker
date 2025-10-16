import { Test, TestingModule } from '@nestjs/testing';
import { FormSubmissionsController } from './form-submissions.controller';

describe('FormSubmissionsController', () => {
  let controller: FormSubmissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormSubmissionsController],
    }).compile();

    controller = module.get<FormSubmissionsController>(FormSubmissionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
