const mongoose = require("mongoose");
const validator = require("validator");

const emailLogSchema = new mongoose.Schema({
  recipients: {
    type: [String],
    validate: {
      validator: function (emails) {
        return emails.every((email) => validator.isEmail(email));
      },
      message: (props) => `${props.value} contains invalid email addresses!`,
    },
    required: [true, 'Recipients are required'],
  },
  bcc: { type: [String], default: [] },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
  },
  text: {
    type: String,
    required: [true, 'Text is required'],
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
  error: String // Optional field to store error message if applicable
});

const EmailLog = mongoose.model("EmailLog", emailLogSchema);

module.exports = EmailLog;

