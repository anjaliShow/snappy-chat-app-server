const formidable = require("formidable");
const validator = require("validator");
const Auth = require("../models/authModel");

exports.createUser = async (req, res) => {
  try {
    console.log("req.body", req.body);
    // const { userName, email, password } = req.body;

    const newUser = await Auth.create(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      newUser,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, error });
  }
};
exports.loginUser = async (req, res) => {
  try {
    console.log("req.body", req.body);

    const findUser = await Auth.findOne({ email: req.body.email });
    // console.log("findUser", findUser);

    if (!findUser) {
      res.status(501).json({ success: false, message: "User does'nt exist" });
    } else {
      if (findUser?.password === req.body.password) {
        res.status(201).json({
          success: true,
          message: "User login successfull",
          // user: findUser.email,
          user: findUser,
        });
      }

      if (findUser.password !== req.body.password) {
        res
          .status(501)
          .json({ success: false, message: "Invalid credentials" });
      }
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, error });
  }
};

exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.avatarImage;
    const userData = await Auth.findByIdAndUpdate(
      userId,
      {
        isAavatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.status(200).json({
      isSet: userData.isAavatarImageSet,
      avatarImage: userData.avatarImage,
    });
  } catch (error) {
    res.status(500).send(error);
    // next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    //find all users excluding the params id user
    const users = await Auth.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "userName",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};
