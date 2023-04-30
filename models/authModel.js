// const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    // image: {
    //   type: String,
    //   // default: null,
    // },
    isAavatarImageSet: {
      type: Boolean,
      default: false,
    },
    avatarImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// module.exports = model("Auth", registerSchema);
module.exports = mongoose.model("Auth", registerSchema);
