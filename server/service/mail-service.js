const nodemailer = require("nodemailer");

class MailService {
    constructor() {
        const port = Number(process.env.SMTP_PORT);
        const secure = port === 465;

        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port,
            secure,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
            logger: true,
            debug: true,

            connectionTimeout: 10_000,
            greetingTimeout: 10_000,
            socketTimeout: 15_000,
        });
    }

    async sendActivationMail(to, link) {

        await this.transporter.verify();
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Activation Mail ' + process.env.API_URL,
            html: `
        <div>
          <h1>For activation tap the link</h1>
          <a href="${link}">${link}</a>
        </div>
      `,
        });
    }
}

module.exports = new MailService();
