const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      enum: ["user", "chatbot"], // restricts values
    },
    message: {
      type: String,
      required: true,
    },
    response: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // adds createdAt, updatedAt
);

module.exports = mongoose.model("ChatMessage", chatMessageSchema);
