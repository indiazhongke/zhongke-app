const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* ADMIN LOGIN */
router.post("/admin-login", async (req, res) => {
  try {
    const { securityKey } = req.body;

    if (securityKey !== process.env.ADMIN_SECURITY_KEY) {
      return res.status(401).json({ error: "Invalid security key" });
    }

    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: { role: "admin", name: "Admin" }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* MEMBER LOGIN */
/* MEMBER LOGIN */
router.post("/member-login", async (req, res) => {
  try {
    let { name, memberId } = req.body;

    if (!name || !memberId) {
      return res.status(400).json({ error: "All fields required" });
    }

    name = name.trim();
    memberId = memberId.trim().toLowerCase();

    // Validate Member ID format
    if (!/^#[a-z]{4}\d{4}$/.test(memberId)) {
      return res.status(400).json({ error: "Invalid Member ID format" });
    }

    // Case-insensitive name match
    const user = await User.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
      memberId: memberId
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: "member" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: "member"
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
