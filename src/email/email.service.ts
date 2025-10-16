import { Injectable, Logger } from '@nestjs/common';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly sesClient: SESClient;

  constructor() {
    this.sesClient = new SESClient({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  async sendBulkEmail(
    toAddresses: string[],
    subject: string,
    htmlBody: string,
    textBody?: string,
  ): Promise<void> {
    const command = new SendEmailCommand({
      Source: process.env.SES_FROM_EMAIL!, // e.g. no-reply@yourdomain.com
      Destination: { ToAddresses: toAddresses },
      Message: {
        Subject: { Data: subject },
        Body: {
          Html: { Data: htmlBody },
          ...(textBody ? { Text: { Data: textBody } } : {}),
        },
      },
    });

    try {
      const response = await this.sesClient.send(command);
      this.logger.log(`SES message sent: ${response.MessageId}`);
    } catch (err) {
      this.logger.error('SES send failed', err);
      throw err;
    }
  }
}
