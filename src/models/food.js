const { model, Schema } = require("mongoose");

const foodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["normal", "smartchef"],
    required: true,
    default: "normal",
  },
});

module.exports = model("Food", foodSchema);
