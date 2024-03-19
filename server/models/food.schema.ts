import { Schema, model } from "mongoose";

const NutritionalSchema = new Schema({
  Calories: Number,
  Protein: Number,
  Carbs: Number,
  Fat: Number,
  Fiber: Number,
});

const FoodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image_url: String,
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["main", "drink", "desert"],
    default: "main",
    required: true,
  },
  description: {
    type: String,
  },
  is_displayed: {
    type: Boolean,
    required: true,
    default: false,
  },
  nutritional_value: NutritionalSchema,
});

export default model("Food", FoodSchema);
