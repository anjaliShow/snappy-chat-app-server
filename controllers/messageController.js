const MessageModel = require("../models/messageModel");

exports.addMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const data = await MessageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) return res.json({ msg: "Message added successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAllMessage = async (req, res) => {
  try {
    const { from, to } = req.body;
    const message = await MessageModel.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectMessages = message.map((msg) => {
      return {
        fromSelf: msg.sender === from,
        message: msg.message.text,
      };
    });
    res.json(projectMessages);
  } catch (error) {
    res.status(500).send(error);
  }
};
