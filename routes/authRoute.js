const router = require("express").Router();
const {
  createUser,
  loginUser,
  setAvatar,
  getAllUsers,
} = require("../controllers/authController");

// router.route("/user-register").post(createUser);
router.post("/user-register", createUser);
router.post("/user-login", loginUser);
router.post("/set-user-avatars/:id", setAvatar);
router.get("/all-users/:id", getAllUsers);

module.exports = router;
