const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    recipient: {
      type: String,
      required: true, // 🔥 specific user
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
