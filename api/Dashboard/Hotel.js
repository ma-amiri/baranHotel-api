import  express from "express"
import  router  from  express.Router();
import  { Hotel } from "../models/Hotel.model.js";

// GET all hotels
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.findAll();
    res.json(hotels);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
});

// POST create new hotel
router.post("/", async (req, res) => {
  const { name, location } = req.body;

  try {
    const hotel = await Hotel.create({ name, location });
    res.status(201).json(hotel);
  } catch (error) {
    console.error("Error creating hotel:", error);
    res.status(500).json({ error: "Failed to create hotel" });
  }
});

// DELETE hotel by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Hotel.destroy({ where: { id: req.params.id  } });
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting hotel:", error);
    res.status(500).json({ error: "Failed to delete hotel" });
  }
});

export default router;


