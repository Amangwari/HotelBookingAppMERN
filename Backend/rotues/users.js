import express from "express";
import {
  DeleteUser,
  GetSingleUser,
  GetUsers,
  UpdateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("hello user, you are logged in");
// });

// // verify user
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("hello user, you are logged in, Now you can delete your account");
// });

// // verify Admin
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("hello Admin, you are logged in, Now you can delete all accounts");
// });

router.put("/:id", verifyUser, UpdateUser);
router.get("/:id", verifyUser, GetSingleUser);
router.delete("/:id", verifyUser, DeleteUser);
router.get("/", verifyAdmin, GetUsers);

export default router;
