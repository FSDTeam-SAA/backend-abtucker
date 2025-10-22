import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DisplaySideService } from './display-side.service';

@Controller('display')
export class DisplaySideController {
  constructor(private readonly displayService: DisplaySideService) {}

  @Post()
  @UseInterceptors(FileInterceptor('sideImage'))
  async createDisplay(
    @UploadedFile() file: Express.Multer.File,
    @Body('question') question: string,
  ) {
    return this.displayService.createDisplay(file, question);
  }

  @Get()
  async getDisplay() {
    return this.displayService.getDisplay();
  }

  @Patch()
  @UseInterceptors(FileInterceptor('sideImage'))
  async updateDisplay(
    @UploadedFile() file: Express.Multer.File,
    @Body('question') question?: string,
  ) {
    return this.displayService.updateDisplay(file, question);
  }

  @Delete()
  async deleteDisplay() {
    return this.displayService.deleteDisplay();
  }
}
