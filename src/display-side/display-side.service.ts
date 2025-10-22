import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DisplaySite, DisplayDocument } from './display-side.schema';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class DisplaySideService {
  constructor(
    @InjectModel(DisplaySite.name) private displayModel: Model<DisplayDocument>,
    private uploadService: UploadService,
  ) {}

  // CREATE (only one allowed)
  async createDisplay(file: Express.Multer.File, question: string) {
    const existing = await this.displayModel.findOne();
    if (existing)
      throw new BadRequestException(
        'Display already exists. Please update instead.',
      );

    const uploaded = await this.uploadService.uploadImage(file);

    const display = await this.displayModel.create({
      question,
      sideImage: uploaded.secure_url,
    });
    return display;
  }

  // GET the only document
  async getDisplay() {
    const display = await this.displayModel.findOne();
    if (!display) throw new NotFoundException('No display found');
    return display;
  }

  // UPDATE the existing one
  async updateDisplay(file: Express.Multer.File | null, question?: string) {
    const display = await this.displayModel.findOne();
    if (!display) throw new NotFoundException('No display found');

    if (file) {
      const uploaded = await this.uploadService.uploadImage(file);
      display.sideImage = uploaded.secure_url;
    }

    if (question) display.question = question;
    await display.save();
    return display;
  }

  // DELETE the only document
  async deleteDisplay() {
    const display = await this.displayModel.findOne();
    if (!display) throw new NotFoundException('No display found');
    await this.displayModel.deleteOne({ _id: display._id });
    return { message: 'Display deleted successfully' };
  }
}
