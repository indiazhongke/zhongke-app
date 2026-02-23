const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

/* ================= CREATE MESSAGE ================= */
router.post("/", async (req, res) => {
  try {
    const message = new Message({
      from: req.body.from,
      to: req.body.to,
      content: req.body.content,
      createdAt: new Date()
    });

    const savedMessage = await message.save();
    req.app.get("io").emit("newMessage", savedMessage);
    res.status(201).json(savedMessage);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ================= GET MESSAGES ================= */
router.get("/", async (req, res) => {
  try {
    const { user } = req.query;

    let messages;

    if (!user || user === "Admin") {
      // 👑 Admin gets ALL messages
      messages = await Message.find().sort({ createdAt: -1 });
    } else {
      // 👤 Member gets only their messages
      messages = await Message.find({
        $or: [
          { from: user },
          { to: user }
        ]
      }).sort({ createdAt: -1 });
    }

    res.json(messages);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
