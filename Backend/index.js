import express from "express";
const app = express();
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoute from "./rotues/auth.js";
import usersRoute from "./rotues/users.js";
import hotelsRoute from "./rotues/hotels.js";
import roomRoute from "./rotues/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Initial mongo db connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDb Disconnected");
});

// middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomRoute);

// error handling middlewares
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("Frontend/build"));
}

app.listen(PORT, () => {
  connect();
  console.log("Connected to Backend.");
});
