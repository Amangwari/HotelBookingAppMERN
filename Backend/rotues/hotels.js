import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  DeleteHotel,
  GetAllHotel,
  getHotelRooms,
  GetSingleHotel,
  UpdateHotel,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

// import { createError } from "../utils/error.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createHotel);

// Update
router.put("/:id", verifyAdmin, UpdateHotel);

// Delete
router.delete("/:id", verifyAdmin, DeleteHotel);


// Get Single Hotel
router.get("/find/:id", GetSingleHotel);

// Get All Hotel
router.get("/", GetAllHotel);

//  Get by city
router.get("/countByCity", countByCity);

// Get by type
router.get("/countByType", countByType);

// Get hotel route
router.get("/room/:id", getHotelRooms)

export default router;
