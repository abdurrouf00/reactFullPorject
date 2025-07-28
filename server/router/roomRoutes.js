const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");
const upload = require("../middlewares/upload");

router.post("/add", upload.array("images", 5), roomController.createRoom);
router.get("/", roomController.getAllRooms);
router.get("/:id", roomController.getSingleRoom);
router.put("/:id", upload.single("images"), roomController.updateRoom);
router.delete("/:id", roomController.deleteRoom);

module.exports = router;
