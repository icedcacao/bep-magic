const { foodService } = require("../services/indexService");
const { handlingException } = require("../utils/error");

const getAllFoods = async (req, res) => {
  try {
    const category = req.query.category ? { category: req.query.category } : {};
    const foods = await foodService.findAllFood(category);
    return res.status(200).json(foods);
  } catch (error) {
    handlingException(res, error);
  }
};

const getFoodById = async (req, res) => {
  try {
    const food = await foodService.findFoodById(req.params.id);
    return res.status(200).json(food);
  } catch (error) {
    handlingException(res, error);
  }
};

const addFood = async (req, res) => {
  try {
    const data = await foodService.addFood(req.body);
    return res.status(201).json(data);
  } catch (error) {
    handlingException(res, error);
  }
};

const updateFood = async (req, res) => {
  try {
    const data = await foodService.updateFoodById(req.params.id, req.body);
    return res.status(201).json(data);
  } catch (error) {
    handlingException(res, error);
  }
};

const deleteFood = async (req, res) => {
  try {
    const food = await foodService.deleteFoodById(req.params.id);
    return res.status(200).json(food);
  } catch (error) {
    handlingException(res, error);
  }
};

module.exports = {
  getAllFoods,
  getFoodById,
  addFood,
  updateFood,
  deleteFood,
};
