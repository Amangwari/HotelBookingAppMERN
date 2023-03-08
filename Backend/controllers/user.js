import User from "../modals/AuthModal.js";
import jwt from "jsonwebtoken";

// Here we are not creating user bkz we had a register function

// Update User
export const UpdateUser = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    next(err);
  }
};

// Delete User
export const DeleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.param.id);
    res.status(200).json("User Has been Deleted");
  } catch (err) {
    next(err);
  }
};

// Get All User
export const GetUsers = async (req, res, next) => {
  try {
    const users = await User.find(req.params.id);
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// Get Single User
export const GetSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
