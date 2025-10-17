import { Injectable } from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';
import cloudinary from '../config/cloudinary.config';
import streamifier from 'streamifier';
@Injectable()
export class UploadService {
  // Single file upload
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'nest_uploads' },
        (error, result) => {
          // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
          if (error) return reject(error);
          if (!result) return reject(new Error('No result from Cloudinary'));
          resolve(result);
        },
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      streamifier.createReadStream(file.buffer).pipe(stream);
    });
  }

  // Multiple file upload
  async uploadImages(
    files: Express.Multer.File[],
  ): Promise<UploadApiResponse[]> {
    const uploadPromises = files.map((file) => this.uploadImage(file));
    return Promise.all(uploadPromises);
  }
}
