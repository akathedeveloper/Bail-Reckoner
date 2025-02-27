require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { registerUser, loginUser } = require("./authController");

const app = express();
app.use(cors());
app.use(express.json());

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,  // Your email address (e.g., kanishktiwari11a@gmail.com)
    pass: process.env.EMAIL_PASS,  // Your email app password
  },
});

// Routes for authentication
app.post("/register", registerUser);
app.post("/login", loginUser);

// Mail Notification Route
app.post("/send-notification", async (req, res) => {
  const { toEmail, caseId, providerEmail } = req.body;
  const subject = `Case Accepted: CASE-${caseId}`;
  const text = `Your case has been accepted for review by ${providerEmail}.`;
  try {
    const info = await transporter.sendMail({
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject,
      text,
    });
    res.status(200).json({ message: "Email sent successfully", info });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email", error });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
