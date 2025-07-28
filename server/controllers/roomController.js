const Room = require("../model/rooms");
const fs = require("fs");
const path = require("path");

// ✅ Create Room
exports.createRoom = async (req, res) => {
  try {
    const { name, type, category, price, description } = req.body;
    const imagePaths = req.files.map(file => file.filename);

    const newRoom = new Room({
      name,
      type,
      category,
      price,
      description,
      images: imagePaths,
    });

    await newRoom.save();
    res.status(201).json({ message: "Room created successfully", room: newRoom });
  } catch (error) {
    console.error("Create room error:", error);
    res.status(500).json({ message: "Failed to create room", error: error.message });
  }
};

// ✅ Get All Rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch rooms" });
  }
};

// ✅ Get Single Room
exports.getSingleRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch room" });
  }
};

// ✅ Update Room
exports.updateRoom = async (req, res) => {
  try {
    const { name, type, category, price, description } = req.body;
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    if (req.file) {
      room.images.forEach((img) => {
        const filePath = path.join(__dirname, "../uploads", img);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });
      room.images = [req.file.filename];
    }

    room.name = name;
    room.type = type;
    room.category = category;
    room.price = price;
    room.description = description;

    await room.save();
    res.status(200).json({ message: "Room updated", room });
  } catch (error) {
    console.error("Update room error:", error);
    res.status(500).json({ message: "Failed to update room", error: error.message });
  }
};

// ✅ Delete Room
exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    room.images.forEach((img) => {
      const filePath = path.join(__dirname, "../uploads", img);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    await room.deleteOne();
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete room" });
  }
};
