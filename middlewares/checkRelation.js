const jwt = require("jsonwebtoken");
const { User, Auth } = require("../models");
const ApiError = require("../utils/apiError");

const checkOwnership = (roleUser) => {
  return async (req, res, next) => {
    try {
      const bearerToken = req.headers.authorization;

      if (!bearerToken) {
        next(new ApiError("Login terlebih dahulu", 401));
      }

      const token = bearerToken.split("Bearer ")[1];

      const payload = jwt.verify(token, process.env.JWT_SECRET);

      console.log(payload);

      next();
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  };
};
module.exports = checkOwnership;
