import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { ThemeService } from './theme.service';
import { CreateThemeDto } from './theme.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('theme')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Get()
  async getTheme() {
    return this.themeService.getTheme();
  }

  @Post()
  @UseInterceptors(FileInterceptor('logo'))
  async createOrUpdateTheme(
    @Body() body: CreateThemeDto,
    @UploadedFile() logo?: Express.Multer.File,
  ) {
    return this.themeService.createOrUpdateTheme(body, logo);
  }
}
