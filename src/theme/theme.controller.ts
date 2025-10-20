import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  Res,
} from '@nestjs/common';
import { ThemeService } from './theme.service';
import { CreateThemeDto } from './dto/theme.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { sendResponse } from '../common/utils/sendResponse';
import type { Response } from 'express';

@Controller('theme')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Get()
  async getTheme(@Res() res: Response) {
    const theme = await this.themeService.getTheme();
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Theme fetched successfully',
      data: theme,
    });
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'logo', maxCount: 1 },
      { name: 'catImage', maxCount: 10 },
      { name: 'heroImage', maxCount: 1 }, // heroImage যুক্ত হল
    ]),
  )
  async createOrUpdateTheme(
    @Body() body: CreateThemeDto,
    @UploadedFiles()
    files: {
      logo?: Express.Multer.File[];
      catImage?: Express.Multer.File[];
      heroImage?: Express.Multer.File[];
    },
    @Res() res: Response,
  ) {
    const logoFile = files?.logo ? files.logo[0] : undefined;
    const catImageFiles = files?.catImage || [];
    const heroImageFile = files?.heroImage ? files.heroImage[0] : undefined;

    const theme = await this.themeService.createOrUpdateTheme(
      body,
      logoFile,
      catImageFiles,
      heroImageFile,
    );

    return res.status(200).json({
      success: true,
      message: 'Theme created or updated successfully',
      data: theme,
    });
  }
}
