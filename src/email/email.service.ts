import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: Number(587),
      secure: false, // true if using 465
      auth: {
        user: 'sajjadhossainx0@gmail.com',
        pass: 'zsuxzybbpkxiibfd',
      },
    });
  }

  async sendOtpMail(to: string, otp: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await this.transporter.sendMail({
        from: `"No Reply" <${process.env.SMTP_USER}>`,
        to,
        subject: 'Password Reset OTP',
        html: `
          <div>
            <h3>Your OTP Code</h3>
            <p style="font-size: 20px; font-weight: bold;">${otp}</p>
            <p>This OTP will expire in 10 minutes.</p>
          </div>
        `,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to send email');
    }
  }
}
