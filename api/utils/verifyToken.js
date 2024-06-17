import jwt from "jsonwebtoken";
import errorHandler from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "Unauthorized 01"));
  }
  jwt.verify(token, process.env.JWT_TOKEN_KEY, (err, decoded) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized 02"));
    }
    req.user = decoded;
    next();
  });
};
