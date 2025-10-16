import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FormSubmissionsController } from './form-submissions.controller';
import { FormSubmissionsService } from './form-submissions.service';
import { FormSubmission, FormSubmissionSchema } from './form-submission.schema';
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FormSubmission.name, schema: FormSubmissionSchema },
    ]),
  ],
  controllers: [FormSubmissionsController],
  providers: [FormSubmissionsService, UploadService],
})
export class FormSubmissionsModule {}
