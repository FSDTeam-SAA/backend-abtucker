import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  FormSubmission,
  FormSubmissionDocument,
} from './form-submission.schema';
import { CreateFormSubmissionDto } from './dto/create-form-submission.dto';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class FormSubmissionsService {
  constructor(
    @InjectModel(FormSubmission.name)
    private readonly formSubmissionModel: Model<FormSubmissionDocument>,
    private readonly uploadService: UploadService,
  ) {}

  async create(dto: CreateFormSubmissionDto, files?: Express.Multer.File[]) {
    let photoUrls: string[] = [];

    console.log(2);

    if (files && files.length > 0) {
      const result = await this.uploadService.uploadImages(files);
      if (result instanceof Error) {
        throw result;
      }
      photoUrls = result.map((r) => r.secure_url);
    }
    console.log(3, photoUrls);

    const created = new this.formSubmissionModel({
      ...dto,
      photos: photoUrls,
    });

    return created.save();
  }

  async findAll() {
    return this.formSubmissionModel.find().sort({ createdAt: -1 });
  }

  async delete(id: string) {
    const result = await this.formSubmissionModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Form submission not found');
    }
    return { message: 'Deleted successfully' };
  }
}
