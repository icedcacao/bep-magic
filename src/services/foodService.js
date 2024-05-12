const { foodRepo } = require("../repositories/indexRepo");

const findAllFood = async (filter) => {
  try {
    return await foodRepo.findAll(filter);
  } catch (error) {
    throw error;
  }
};

const findFoodById = async (id) => {
  try {
    return await foodRepo.findOneById(id);
  } catch (error) {
    throw error;
  }
};

const addFood = async (data) => {
  try {
    return await foodRepo.insert(data);
  } catch (error) {
    throw error;
  }
};

const updateFoodById = async (id, data) => {
  try {
    return await foodRepo.updateById(id, data);
  } catch (error) {
    throw error;
  }
};

const deleteFoodById = async (id) => {
  try {
    return await foodRepo.deleteById(id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findAllFood,
  findFoodById,
  addFood,
  updateFoodById,
  deleteFoodById,
};
