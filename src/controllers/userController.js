const { userService } = require("../services/indexService");
const { handlingException } = require("../utils/error");

// Bad Error Catching
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const jwtToken = await userService.authenticateUser(username, password);
    return res
      .status(200)
      .cookie("token", jwtToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      })
      .json({ message: "Success!" });
  } catch (error) {
    return res.status(error.code).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  return res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .json({ message: "Success!" });
};

const auth = async (req, res) => {
  res.status(200).json({ message: "Success" });
};

module.exports = { login, logout, auth };
