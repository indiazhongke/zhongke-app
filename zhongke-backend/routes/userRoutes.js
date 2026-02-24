const express = require("express");
const router = express.Router();
const User = require("../models/User");

/* ================= CREATE USER ================= */
router.post("/", async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: "Name and phone required" });
    }

    // Clean inputs
    const cleanName = name.trim();
    const cleanPhone = phone.replace(/\D/g, "");

    // Validate phone (must be 10 digits)
    if (!/^\d{10}$/.test(cleanPhone)) {
      return res.status(400).json({ error: "Phone must be 10 digits" });
    }

    // Generate Member ID
    const first4 = cleanName.toLowerCase().replace(/\s/g, "").slice(0, 4);
    const last4 = cleanPhone.slice(-4);
    const memberId = `#${first4}${last4}`;

    // Check duplicate
    const existing = await User.findOne({ memberId });
    if (existing) {
      return res.status(400).json({ error: "Member already exists" });
    }

    const user = new User({
      name: cleanName,
      phone: cleanPhone,
      memberId
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ================= GET ALL USERS ================= */
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

/* ================= DELETE USER ================= */
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
