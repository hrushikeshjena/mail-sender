require("dotenv").config(); // Load environment variables
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const EmailLog = require("./models/emaillog");

const multer = require("multer");

const app = express();
const port = process.env.PORT || 8080; // Use environment port if available

// Use CORS middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173", // Replace with your frontend URL
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

// Connect to the database
connectDB();

// Middleware
app.use(bodyParser.json());

// Setup multer for handling file uploads
const upload = multer({ dest: "uploads/" });

// Create a transporter object using your SMTP server details
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.emailUSER,
    pass: process.env.emailPass,
  },
});


const validateEmailInput = (req, res, next) => {
  let { recipient, bcc = [], subject, text } = req.body;

  // Parse JSON strings to arrays if needed
  if (typeof recipient === 'string') {
    try {
      recipient = JSON.parse(recipient);
    } catch (error) {
      return res.status(400).json({ message: "Invalid format for recipients" });
    }
  }

  if (typeof bcc === 'string') {
    try {
      bcc = JSON.parse(bcc);
    } catch (error) {
      return res.status(400).json({ message: "Invalid format for BCC" });
    }
  }

  // Perform validation
  if (!Array.isArray(recipient) || !recipient.length || !subject || !text) {
    console.error("Validation failed:", { recipient, bcc, subject, text });
    return res.status(400).json({ message: "Recipients, subject, and text are required" });
  }

  if (!Array.isArray(bcc)) {
    console.error("Validation failed:", { recipients, bcc, subject, text });
    return res.status(400).json({ message: "BCC must be an array" });
  }

  next();
};



app.post("/send-emails", upload.single('attachment'), validateEmailInput, async (req, res) => {
  let { recipients, bcc = [], subjects, text } = req.body;
  console.log("Request Body:", req.body); // Log request body to verify data

  // Ensure recipients is an array
  if (typeof recipients === 'string') {
    try {
      recipients = JSON.parse(recipients);
    } catch (error) {
      return res.status(400).json({ message: "Invalid format for recipients" });
    }
  }

  // Ensure bcc is an array
  if (typeof bcc === 'string') {
    try {
      bcc = JSON.parse(bcc);
    } catch (error) {
      return res.status(400).json({ message: "Invalid format for BCC" });
    }
  }

  // If BCC is not provided, use recipients as BCC
  const finalBcc = Array.isArray(bcc) && bcc.length ? bcc : recipients;

  // Convert arrays to comma-separated strings
  const recipientsList = Array.isArray(recipients) ? recipients.join(",") : "";
  const bccList = Array.isArray(finalBcc) ? finalBcc.join(",") : "";

  const mailOptions = {
    from: process.env.emailUser,
    to: recipientsList,
    bcc: bccList,
    subject: subjects,
    text: text,
    ...(req.file && { attachments: [{ path: req.file.path }] }), // Check if file exists
  };

  try {
    await transporter.sendMail(mailOptions);

    const emailLog = new EmailLogs({ recipients, bcc: finalBcc, subject, text });
    await emailLog.save();

    res.status(200).json({ message: "Emails sent and logged successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      message: "Failed to send emails",
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
});



// Route to fetch email logs
app.get("/get-email-data", async (req, res) => {
  try {
    const emailLogs = await EmailLog.find();
    res.status(200).json(emailLogs);
  } catch (error) {
    console.error("Error fetching email logs:", error);
    res.status(500).json({
      message: "Failed to fetch email logs",
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
});

// Route to delete an email log by ID
app.delete("delete-email-Log/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await EmailLog.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Email log not found" });
    }
    res.status(200).json({ message: "Email log deleted successfully!" });
  } catch (error) {
    console.error("Error deleting email log:", error);
    res.status(500).json({
      message: "Failed to delete email log",
      error: error.message,
      stack: process.env.nodeEnv === 'development' ? error.stack : undefined,
    });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
