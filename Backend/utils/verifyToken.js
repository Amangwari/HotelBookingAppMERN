import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "Your are not authenticated"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err)
      return next(createError(403, "Your have a token but it is not valid"));
    req.user = user;
    next();
  });
};

// verify user
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      if (err) return next(createError(403, "Your are not authorized"));
    }
  });
};

// verify Admin
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      if (err) return next(createError(403, "Your are not authorized"));
    }
  });
};
