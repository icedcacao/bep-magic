const jwt = require("jsonwebtoken");
const path = require("path");

const userService = require("../services/userService");

const errorMessages = require("../utils/error_messages.json");

const authCheck = async (req, res, next) => {
  const { token } = req.cookies;
  const user = await userService.getUserFromToken(token);
  if (!user) {
    return res
      .status(errorMessages.UNAUTHORIZED.code)
      .json({ message: errorMessages.UNAUTHORIZED.message });
  }
  req.user = user;
  next();
};

module.exports = authCheck;
