import express from "express";

import {
  City,
  Type,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} from "../repository/Hotel.js";

const router = express.Router();

// CREATE
router.post("/", createHotel);

// UPDATE
router.put("/:id", updateHotel);

// DELETE
router.delete("/:id", deleteHotel);

// GET
router.get("/find/:id", getHotel);

// GET ALL
router.get("/", getHotels);
router.get("/city", City);
router.get("/type", Type);
router.get("/room/:id", getHotelRooms);

export default router;
