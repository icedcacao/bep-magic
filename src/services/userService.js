const { userRepo } = require("../repositories/indexRepo");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const errorMessages = require("../utils/error_messages.json");
const { generateToken } = require("../utils/auth");

// This routes use to validate token catch inside controller
const authenticateUser = async (username, password) => {
  const user = await userRepo.findOne({ username: username });
  if (!user) {
    throw errorMessages.UNAUTHORIZED;
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw errorMessages.UNAUTHORIZED;
  }
  const token = generateToken(user);
  return token;
};

const getUserFromToken = async function (token) {
  try {
    const decodedToken = jwt.decode(token);
    const id = decodedToken.id;
    return await userRepo.findById(id);
  } catch (error) {
    return null;
  }
};

module.exports = { authenticateUser, getUserFromToken };
