
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendMail = async (emailOptions) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail(emailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email not sent", error);
  }
};

module.exports = sendMail;

