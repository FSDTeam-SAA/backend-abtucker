import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Theme, ThemeDocument } from './theme.schema';
import { CreateThemeDto } from './theme.dto';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class ThemeService {
  constructor(
    @InjectModel(Theme.name) private themeModel: Model<ThemeDocument>,
    private uploadService: UploadService,
  ) {}

  async getTheme(): Promise<Theme> {
    return this.themeModel.findOne().exec();
  }

  async createOrUpdateTheme(
    data: CreateThemeDto,
    logoFile?: Express.Multer.File,
  ): Promise<Theme> {
    let logoUrl = data.logo;

    if (logoFile) {
      const result = await this.uploadService.uploadImage(logoFile);
      logoUrl = result.secure_url;
    }

    const existing = await this.themeModel.findOne();
    if (existing) {
      existing.color = data.color;
      if (logoUrl) existing.logo = logoUrl;
      return existing.save();
    } else {
      const theme = new this.themeModel({
        color: data.color,
        logo: logoUrl,
      });
      return theme.save();
    }
  }
}
