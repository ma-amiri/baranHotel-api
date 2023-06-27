import express from'express';
import nodemailer from'nodemailer';

const app = express();


// Send email endpoint
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter using your email service credentials
  const transporter = nodemailer.createTransport({
    service: 'YourEmailService', // Specify your email service provider
    auth: {
      user: 'your-email@example.com', // Replace with your email address
      pass: 'your-email-password' // Replace with your email password
    }
  });

  // Define the email options
  const mailOptions = {
    from: 'your-email@example.com', // Replace with your email address
    to: email,
    subject: 'New message from contact form',
    text: `You have received a new message from ${name} (${email}):\n\n${message}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Failed to send email' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ success: true, message: 'Email sent successfully' });
    }
  });
});

