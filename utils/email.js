const nodemailer = require('nodemailer');

const sendEmail = async options => {
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            name: process.env.EMAIL_NAME,
            password: process.env.EMAIL_PASSWORD
        }
    });

    // 2) Define the email options
    const mailOptions = {
        from: 'Adil <hello@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html:
    }

    // 3) Actually send the email
    await transporter.sendEmail(mailOptions);
}

module.exports = sendEmail;