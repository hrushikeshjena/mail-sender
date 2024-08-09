// server.js (or your backend server file)
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.use(bodyParser.json());

let smtpConfig = {
  host: 'default.smtp.host',
  port: 587,
  user: 'default@example.com',
  pass: 'defaultpassword'
};

// Endpoint to update SMTP configurations
app.post('/update-smtp-config', (req, res) => {
  const { host, port, user, pass } = req.body;
  smtpConfig = { host, port, user, pass };
  res.status(200).send('SMTP configuration updated successfully');
});

// Endpoint to send emails
app.post('/send-emails', async (req, res) => {
  const { recipients, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.pass,
    },
  });

  try {
    const mailOptions = {
      from: smtpConfig.user,
      to: recipients,
      subject: subject,
      text: text,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send('Emails sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send emails');
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// make some changes in index.js  