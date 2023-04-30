const router = require("express").Router();
const {
  addMessage,
  getAllMessage,
} = require("../controllers/messageController");

router.post("/add-msg", addMessage);
router.post("/get-msg", getAllMessage);

module.exports = router;
