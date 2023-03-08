import express from "express";
import {
  createRoom,
  DeleteRoom,
  GetAllRooms,
  GetSingleRoom,
  UpdateRoom,
  updateRoomAvailability,
} from "../controllers/rooms.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/:hotelid", verifyAdmin, createRoom);

// Update
router.put("/:id", verifyAdmin, UpdateRoom);
router.put("/availability/:id", updateRoomAvailability);

// Delete
router.delete("/:id/:hotelid", verifyAdmin, DeleteRoom);

// Get Single Hotel
router.get("/:id", GetSingleRoom);

// Get All Hotel
router.get("/", GetAllRooms);

export default router;
