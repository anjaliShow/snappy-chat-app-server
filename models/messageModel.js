const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message: {
      text: {
        type: String,
      },
    },
    users: Array,
    sender: {
      type: String,
      ref: "Auth",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
