import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

cloudinary.config({
  cloud_name: configService.get<string>('CLOUDINARY_CLOUD_NAME') || 'ddtuyxcsl',
  api_key: configService.get<string>('CLOUDINARY_API_KEY') || '155594432527689',
  api_secret:
    configService.get<string>('CLOUDINARY_API_SECRET') ||
    'fw86uLN2JW_S9tYxb69R48Fym2k',
});

export default cloudinary;
