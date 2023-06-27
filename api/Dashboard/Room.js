import express  from "express";
const router = express.Router();
import { Room } from "../models/Room.model.js";

// GET all rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
});

// POST create new room
router.post("/", async (req, res) => {
  const { name, capacity } = req.body;

  try {
    const room = await Room.create({ name, capacity });
    res.status(201).json(room);
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ error: "Failed to create room" });
  }
});

// DELETE room by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Room.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ error: "Failed to delete room" });
  }
});
export default router;
