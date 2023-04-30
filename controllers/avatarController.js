const Avatar = require("../models/avatarModel");

exports.createAvatar = async (req, res) => {
  try {
    const newAvatar = await Avatar.create({
      avatarImage: req.body.avatarImage,
    });
    res.status(200).json({ newAvatar });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, error });
  }
};
exports.getAvatar = async (req, res) => {
  try {
    const getAllAvatars = await Avatar.find();
    res.status(200).json(getAllAvatars);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, error });
  }
};
