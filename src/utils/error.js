const { default: mongoose } = require("mongoose");
const errorMessages = require("../utils/error_messages.json");

function handlingException(res, error) {
  console.log(error);
  if (
    error instanceof mongoose.Error.ValidationError ||
    error instanceof mongoose.Error.CastError
  ) {
    res
      .status(errorMessages.BAD_REQUEST.code)
      .json({ message: errorMessages.BAD_REQUEST.message });
  } else {
    res
      .status(errorMessages.INTERNAL_SERVER_ERROR.code)
      .json({ message: errorMessages.INTERNAL_SERVER_ERROR.message });
  }
}

module.exports = {
  handlingException,
};
