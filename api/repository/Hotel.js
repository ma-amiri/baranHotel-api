import Hotel from "../models/Hotel.model.js";
import Room from "../models/Room.model.js";


export const createHotel = async (req, res, next) => {
  const newHotel = req.body;

  try {
    const savedHotel = await Hotel.create(newHotel);
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.status(200).json(updatedHotel[1][0]);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.destroy({ where: { id: req.params.id } });
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};
// get one Hotel
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
// get all Hotels
export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.findAll({
      where: {
        ...others,
        cheapestPrice: { [Op.gt]: min || 1, [Op.lt]: max || 999 },
      },
      limit: req.query.limit,
    });
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const City = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.count({ where: { city: city } });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const Type = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.count({ where: { type: "hotel" } });
    const apartmentCount = await Hotel.count({ where: { type: "apartment" } });
    const resortCount = await Hotel.count({ where: { type: "resort" } });
    const villaCount = await Hotel.count({ where: { type: "villa" } });
   

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findByPk(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
