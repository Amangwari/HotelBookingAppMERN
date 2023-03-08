import Hotel from "../modals/Hotel.js";
import Room from "../modals/Rooms.js"
import jwt from "jsonwebtoken";

// Create Hotel
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

// Update Hotel
export const UpdateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

// Delete Hotel
export const DeleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (err) {
    next(err);
  }
};

// Get All Hotel
export const GetAllHotel = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 200, $lt: max || 1499 },
    }).limit(req.query.limit || 4);

    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

// Get Single Hotel
export const GetSingleHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

// get hotel by city
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// get hotel by Type
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const restaurentCount = await Hotel.countDocuments({ type: "restaurent" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      {
        type: "hotel",
        count: hotelCount,
      },
      {
        type: "resort",
        count: resortCount,
      },
      {
        type: "apartment",
        count: apartmentCount,
      },
      {
        type: "restaurent",
        count: restaurentCount,
      },
      {
        type: "villa",
        count: villaCount,
      },
      {
        type: "cabin",
        count: cabinCount,
      },
    ]);
  } catch (err) {
    next(err);
  }
};

// Get hotel rooms by id  
export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
