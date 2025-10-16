import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FormSubmissionsService } from './form-submissions.service';
import { CreateFormSubmissionDto } from './dto/create-form-submission.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('form-submissions')
export class FormSubmissionsController {
  constructor(
    private readonly formSubmissionsService: FormSubmissionsService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('photos', 10)) // accept up to 10 files
  create(
    @Body() dto: CreateFormSubmissionDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.formSubmissionsService.create(dto, files);
  }

  @Get()
  findAll() {
    return this.formSubmissionsService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.formSubmissionsService.delete(id);
  }
}
