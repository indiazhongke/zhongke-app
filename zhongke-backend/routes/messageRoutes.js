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

// DELETE FOR ME
router.put("/:id/delete-for-me", async (req, res) => {
  try {
    const user = req.body.user; // who is deleting

    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ error: "Message not found" });

    if (!message.deletedFor) message.deletedFor = [];

    if (!message.deletedFor.includes(user)) {
      message.deletedFor.push(user);
    }

    await message.save();
    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE FOR EVERYONE
router.put("/:id/delete-for-everyone", async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ error: "Message not found" });

    message.isDeletedForEveryone = true;

    await message.save();
    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
