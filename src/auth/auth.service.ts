import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: EmailService,
  ) {}

  async register(name: string, email: string, password: string) {
    const existing = await this.usersService.findByEmail(email);
    if (existing) throw new UnauthorizedException('Email already registered');
    return this.usersService.create({ name, email, password });
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: (user as { _id: string })._id, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    return { token };
  }

  // 🟡 STEP 1: send otp
  async sendPasswordResetOtp(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    await this.usersService.updateUser((user as any)._id, {
      resetOtp: otp,
      resetOtpExpiry: expiry,
    });

    await this.mailService.sendOtpMail(email, otp);
    return { message: 'OTP sent to email' };
  }

  // 🟢 STEP 2: verify otp and issue reset token
  async verifyResetOtp(email: string, otp: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || user.resetOtp !== otp)
      throw new BadRequestException('Invalid OTP');

    if ((user as { resetOtpExpiry: Date }).resetOtpExpiry < new Date())
      throw new BadRequestException('OTP expired');

    // 🪙 issue temporary reset token
    const resetToken = await this.jwtService.signAsync(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      { sub: (user as any)._id, type: 'reset' },
      { expiresIn: '10m' }, // 10 minutes
    );

    // clear OTP (optional)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    await this.usersService.updateUser((user as any)._id, {
      resetOtp: null,
      resetOtpExpiry: null,
    });

    return { message: 'OTP verified', resetToken };
  }

  // 🔐 STEP 3: reset password using reset token
  async resetPasswordWithToken(userId: string, newPassword: string) {
    const hashed = await bcrypt.hash(newPassword, 10);
    await this.usersService.updateUser(userId, { password: hashed });
    return { message: 'Password reset successful' };
  }

  // utility to verify reset token
  async verifyResetToken(token: string): Promise<string> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const payload = await this.jwtService.verifyAsync(token);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (payload.type !== 'reset')
        throw new UnauthorizedException('Invalid token');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return payload.sub;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
