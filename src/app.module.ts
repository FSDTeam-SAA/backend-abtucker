import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { UploadModule } from './upload/upload.module';
import { FormSubmissionsModule } from './form-submissions/form-submissions.module';
import { ThemeModule } from './theme/theme.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRoot(
      process.env.MONGO_URI ??
        'mongodb+srv://fsdteamsaa:YofZqFXb5mFd0xFC@cluster0.wn3crgd.mongodb.net/abtucker?retryWrites=true&w=majority&appName=Cluster0',
    ),
    UsersModule,
    AuthModule,
    EmailModule,
    UploadModule,
    FormSubmissionsModule,
    ThemeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
