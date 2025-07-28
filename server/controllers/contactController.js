// controllers/messageController.js
const nodemailer = require("nodemailer");

exports.sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: "abdurroufkpkh@gmail.com",
      subject: `Message from ${name}`,
      text: message,
    });

    res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
};
