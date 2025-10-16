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
          if (error) return reject(error);
          if (!result) return reject(new Error('No result from Cloudinary'));
          resolve(result);
        },
      );

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

// import { Injectable } from '@nestjs/common';
// import { UploadApiResponse } from 'cloudinary';
// import toStream from 'buffer-to-stream';
// import cloudinary from '../config/cloudinary.config';

// @Injectable()
// export class UploadService {
//   // 👉 Single file upload
//   async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
//     console.log('File:', file.originalname, file.mimetype, file.size);
//     console.log('Cloudinary config:', cloudinary.config());

//     return new Promise((resolve, reject) => {
//       const upload = cloudinary.uploader.upload_stream(
//         { folder: 'nest_uploads' },
//         (error: unknown, result: UploadApiResponse | undefined) => {
//           if (error) {
//             const errMessage =
//               error instanceof Error ? error.message : 'Unknown error';
//             reject(new Error(errMessage));
//             return;
//           }
//           if (!result) {
//             reject(new Error('No result from Cloudinary'));
//             return;
//           }
//           resolve(result);
//         },
//       );

//       (toStream(file.buffer) as NodeJS.ReadableStream).pipe(upload);
//     });
//   }

//   // 👉 Multiple file upload
//   async uploadImages(
//     files: Express.Multer.File[],
//   ): Promise<UploadApiResponse[]> {
//     const uploadPromises = files.map((file) => this.uploadImage(file));

//     return Promise.all(uploadPromises);
//   }
// }
