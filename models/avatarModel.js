const mongoose = require("mongoose");

const avatarSchema = new mongoose.Schema({
  avatarImage: String,
});

module.exports = mongoose.model("Avatar", avatarSchema);
