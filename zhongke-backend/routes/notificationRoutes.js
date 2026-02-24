const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");

/* CREATE */
router.post("/", async (req, res) => {
  try {
    const { message, recipient } = req.body;

    if (!message || !recipient) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const notification = new Notification({
      message,
      recipient
    });

    const saved = await notification.save();
    res.status(201).json(saved);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET ONLY USER'S NOTIFICATIONS */
router.get("/", async (req, res) => {
  try {
    const user = req.query.user;

    if (!user) {
      return res.status(400).json({ error: "User required" });
    }

    const notifications = await Notification.find({
      recipient: user
    }).sort({ createdAt: -1 });

    res.json(notifications);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* MARK AS READ */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* DELETE USER NOTIFICATIONS */
router.delete("/", async (req, res) => {
  try {
    const user = req.query.user;

    await Notification.deleteMany({ recipient: user });

    res.json({ message: "Notifications cleared" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
