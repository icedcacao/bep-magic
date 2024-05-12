const Food = require("../models/food");

const findAll = async (filter) => {
  try {
    return await Food.find(filter).lean();
  } catch (error) {
    throw error;
  }
};

const findOneById = async (id) => {
  try {
    return await Food.findById(id).lean();
  } catch (error) {
    throw error;
  }
};

const insert = async (data) => {
  try {
    return await new Food(data).save();
  } catch (error) {
    throw error;
  }
};

const updateById = async (id, data) => {
  try {
    return await Food.findByIdAndUpdate(id, data).lean();
  } catch (error) {
    throw error;
  }
};

const deleteById = async (id) => {
  try {
    return await Food.findByIdAndDelete(id).lean();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findAll,
  findOneById,
  insert,
  updateById,
  deleteById,
};
