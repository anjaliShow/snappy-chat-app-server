const router = require("express").Router();
const { createAvatar, getAvatar } = require("../controllers/avatarController");

router.post("/create-avatar", createAvatar);
router.get("/get-avatars", getAvatar);

module.exports = router;
