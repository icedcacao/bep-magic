import { Schema, model } from "mongoose";

const NutritionalSchema = new Schema({
  calories: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  },
  fat: {
    type: Number,
    required: true,
  },
  fiber: {
    type: Number,
    required: true,
  },
});

const FoodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["Main", "Drink", "Dessert"],
    default: "Main",
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
  nutritional_value: {
    type: NutritionalSchema,
    required: true,
    default: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
    },
  },
});

export default model("Food", FoodSchema);
