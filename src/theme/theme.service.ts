import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Theme, ThemeDocument } from './theme.schema';
import { CreateThemeDto } from './dto/theme.dto';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class ThemeService {
  constructor(
    @InjectModel(Theme.name) private themeModel: Model<ThemeDocument>,
    private uploadService: UploadService,
  ) {}

  async getTheme(): Promise<Theme> {
    return this.themeModel.findOne().exec() as Promise<Theme>;
  }

  async createOrUpdateTheme(
    data: CreateThemeDto,
    logoFile?: Express.Multer.File,
    catImageFiles?: Express.Multer.File[],
    heroImageFile?: Express.Multer.File,
  ): Promise<Theme> {
    let logoUrl = data.logo;
    let catImageUrls: string[] = data.catImage || [];
    let heroImageUrl = data.heroImage;

    // Upload logo file if provided
    if (logoFile) {
      const result = await this.uploadService.uploadImage(logoFile);
      logoUrl = result.secure_url;
    }

    // Upload catImage files if provided
    if (catImageFiles && catImageFiles.length > 0) {
      const uploadResults = await Promise.all(
        catImageFiles.map((file) => this.uploadService.uploadImage(file)),
      );
      catImageUrls = uploadResults.map((res) => res.secure_url);
    }

    // Upload heroImage file if provided
    if (heroImageFile) {
      const result = await this.uploadService.uploadImage(heroImageFile);
      heroImageUrl = result.secure_url;
    }

    const existing = await this.themeModel.findOne();
    if (existing) {
      existing.color = data.color;
      existing.backgroundColor =
        data.backgroundColor ?? existing.backgroundColor;
      if (logoUrl) existing.logo = logoUrl;
      if (catImageUrls.length > 0) existing.catImage = catImageUrls;
      if (heroImageUrl) existing.heroImage = heroImageUrl;
      return existing.save();
    } else {
      const theme = new this.themeModel({
        color: data.color,
        logo: logoUrl,
        backgroundColor: data.backgroundColor,
        catImage: catImageUrls,
        heroImage: heroImageUrl,
      });
      return theme.save();
    }
  }
}
