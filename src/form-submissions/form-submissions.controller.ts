import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UploadedFiles,
  UseInterceptors,
  Patch,
} from '@nestjs/common';
import { FormSubmissionsService } from './form-submissions.service';
import { CreateFormSubmissionDto } from './dto/create-form-submission.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UpdateStatusDto } from './dto/update-status.dto';

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

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) {
    return this.formSubmissionsService.updateStatus(id, dto.status);
  }
}
