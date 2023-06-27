import Room from "../models/Room.model.js";
import Hotel from "../models/Hotel.model.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = req.body;

  try {
    const savedRoom = await Room.create(newRoom);
    try {
      await Hotel.update(
        { id: hotelId },
        {
          rooms: sequelize.fn("array_append", sequelize.col("rooms"), savedRoom.id),
        }
      );
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.status(200).json(updatedRoom[1][0]);
  } catch (err) {
    next(err);
  }
};

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.update(
      {
        "roomNumbers._id": req.params.id,
      },
      {
        "roomNumbers.unavailableDates": sequelize.fn(
          "array_append",
          sequelize.col("roomNumbers.unavailableDates"),
          req.body.dates
        ),
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.destroy({ where: { id: req.params.id } });
    try {
      await Hotel.update(
        { id: hotelId },
        {
          rooms: sequelize.fn("array_remove", sequelize.col("rooms"), req.params.id),
        }
      );
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findByPk(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.findAll();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
