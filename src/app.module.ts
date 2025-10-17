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
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URL');
        console.log('🧪 MONGODB_URL =', uri);
        return { uri };
      },
      inject: [ConfigService],
    }),
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
