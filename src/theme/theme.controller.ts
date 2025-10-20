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
import { FilesInterceptor } from '@nestjs/platform-express';
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

  // @Post()
  // @UseInterceptors(FileInterceptor('logo'))
  // async createOrUpdateTheme(
  //   @Body() body: CreateThemeDto,
  //   @UploadedFile() logo?: Express.Multer.File,
  //   @Res() res?: Response,
  // ) {
  //   const theme = await this.themeService.createOrUpdateTheme(body, logo);
  //   if (!res) {
  //     // handle the case when res is undefined
  //     return;
  //   }

  //   return sendResponse(res, {
  //     statusCode: 200,
  //     success: true,
  //     message: 'Theme created/updated successfully',
  //     data: theme,
  //   });

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  // We are using 'files' for multiple file upload (logo + catImage)
  async createOrUpdateTheme(
    @Body() body: CreateThemeDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response,
  ) {
    // Find logo and catImage files from uploaded files
    const logoFile = files.find((file) => file.fieldname === 'logo');
    const catImageFiles = files.filter((file) => file.fieldname === 'catImage');

    const theme = await this.themeService.createOrUpdateTheme(
      body,
      logoFile,
      catImageFiles,
    );

    return res.status(200).json({
      success: true,
      message: 'Theme created or updated successfully',
      data: theme,
    });
  }
}
