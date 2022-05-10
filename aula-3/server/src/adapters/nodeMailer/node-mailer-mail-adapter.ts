import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "70ac327a2b6e87",
    pass: "8fb8f5c6ae299e"
  }
});

export class NodeMailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {


    await transport.sendMail({
      from: 'Feedback api<api@feedback.com>',
      to: 'DwarfThief <dev@feedback.com.br>',
      subject,
      html: body
    })
  }
}