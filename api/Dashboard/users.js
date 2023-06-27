import express  from "express";
const router = express.Router();
import {User } from "../models/User.model.js";


// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// POST create new user
router.post("/", async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// DELETE user by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await User.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

export default router;
