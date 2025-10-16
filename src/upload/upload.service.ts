import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse } from 'cloudinary';
import toStream from 'buffer-to-stream';

@Injectable()
export class UploadService {
  // 👉 Single file upload
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { folder: 'nest_uploads' },
        (error: unknown, result: UploadApiResponse | undefined) => {
          if (error) {
            const errMessage =
              error instanceof Error ? error.message : 'Unknown error';
            reject(new Error(errMessage));
            return;
          }
          if (!result) {
            reject(new Error('No result from Cloudinary'));
            return;
          }
          resolve(result);
        },
      );

      (toStream(file.buffer) as NodeJS.ReadableStream).pipe(upload);
    });
  }

  // 👉 Multiple file upload
  async uploadImages(
    files: Express.Multer.File[],
  ): Promise<UploadApiResponse[]> {
    console.log(1);

    const uploadPromises = files.map((file) => this.uploadImage(file));
    console.log(4);
    console.log(uploadPromises);
    return Promise.all(uploadPromises);
  }
}
