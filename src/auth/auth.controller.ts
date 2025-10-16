import { Body, Controller, Post, Res, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { sendResponse } from '../common/utils/sendResponse';
import type { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto, @Res() res: Response) {
    const result = await this.authService.register(
      dto.name,
      dto.email,
      dto.password,
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  }
  /***************
   * ADMIN LOGIN *
   ***************/
  @Post('login')
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const result = await this.authService.login(dto.email, dto.password);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Login successful',
      data: result,
    });
  }

  /*******************
   * FORGET PASSWORD *
   *******************/
  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string, @Res() res: Response) {
    const result = await this.authService.sendPasswordResetOtp(email);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result.message,
    });
  }

  /**************
   * VERIFY OTP *
   **************/
  @Post('verify-otp')
  async verifyOtp(@Body() body: any, @Res() res: Response) {
    const result = await this.authService.verifyResetOtp(body.email, body.otp);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result.message,
      data: { resetToken: result.resetToken },
    });
  }

  /******************
   * RESET PASSWORD *
   ******************/
  @Post('reset-password')
  async resetPassword(
    @Headers('authorization') authHeader: string,
    @Body('newPassword') newPassword: string,
    @Res() res: Response,
  ) {
    // Authorization: Bearer <token>
    const token = authHeader?.split(' ')[1];
    const userId = await this.authService.verifyResetToken(token);
    const result = await this.authService.resetPasswordWithToken(
      userId,
      newPassword,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result.message,
    });
  }
}
