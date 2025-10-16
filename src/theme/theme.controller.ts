import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Res,
} from '@nestjs/common';
import { ThemeService } from './theme.service';
import { CreateThemeDto } from './dto/theme.dto';
import { FileInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(FileInterceptor('logo'))
  async createOrUpdateTheme(
    @Body() body: CreateThemeDto,
    @UploadedFile() logo?: Express.Multer.File,
    @Res() res?: Response,
  ) {
    const theme = await this.themeService.createOrUpdateTheme(body, logo);
    if (!res) {
      // handle the case when res is undefined
      return;
    }

    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Theme created/updated successfully',
      data: theme,
    });
  }
}
