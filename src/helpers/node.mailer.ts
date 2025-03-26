import { createTransport } from 'nodemailer';
import { TransportOptions } from './type';
import * as fs from 'fs';
import * as path from 'path';

class Mailer {

  static logo = fs.readFileSync(path.join(__dirname, '..', 'common/templates/logo.png'));

  static transporterOptions: TransportOptions = {
    host: process.env.SMTP_HOST as string,
    port: process.env.SMTP_PORT as string,
    secure: true,
    auth: {
      user: process.env.SMTP_USER as string,
      pass: process.env.SMTP_PASSWORD as string,
    },
  };
  static transporter = createTransport(Mailer.transporterOptions as any);

  static activation = async (email: string, token: string, fullName: string) => {
    const templatePath = path.join(__dirname, '..', 'common/templates/accept-invite.html');
    let html = fs.readFileSync(templatePath).toString();
    const link = process.env.CLIENT_URL + '/activate/' + token;
    html = html.replace('{{link}}', link);
    html = html.replace('{{firstName}}', fullName);
    html = html.replace('{{email}}', email);
    await Mailer.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Invitation in ' + process.env.CLIENT_URL,
      html,
      attachments: [
        {
          filename: 'image.jpg',
          content: Mailer.logo,
          cid: 'imageAttachment',
        },
      ],
    });
  };
  static forgotPassword = async (email: string, token: string, fullName: string) => {
    const templatePath = path.join(__dirname, '..', 'common/templates/forgot-password.html');
    let html = fs.readFileSync(templatePath).toString();
    const link = process.env.CLIENT_URL + '/reset-password/' + token;
    html = html.replace('{{link}}', link);
    html = html.replace('{{firstName}}', fullName);
    await Mailer.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Invitation in ' + process.env.CLIENT_URL,
      html,
      attachments: [
        {
          filename: 'image.jpg',
          content: Mailer.logo,
          cid: 'imageAttachment',
        },
      ],
    });
  };
}

export default Mailer;
