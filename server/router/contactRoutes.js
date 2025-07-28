const express = require("express");
const router = express.Router();
const Message = require("../model/Message");

// POST: Save new message
router.post("/send-message", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMsg = new Message({ name, email, message });
    await newMsg.save();

    res.status(200).json({ message: "Message saved successfully" });
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ message: "Failed to save message" });
  }
});

// GET: Get all messages for Admin
router.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Fetch messages error:", error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

module.exports = router;
