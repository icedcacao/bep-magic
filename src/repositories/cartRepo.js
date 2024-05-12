const Cart = require("../models/cart");

const findAll = async (filter, sort, skip, limit) => {
  try {
    return await Cart.find(filter).sort(sort).skip(skip).limit(limit).lean();
  } catch (error) {
    throw error;
  }
};

const findOneById = async (id) => {
  try {
    return await Cart.findById(id).lean();
  } catch (error) {
    throw error;
  }
};

const insert = async (data) => {
  try {
    return await new Cart(data).save();
  } catch (error) {
    throw error;
  }
};

const updateById = async (id, data) => {
  try {
    return await Cart.findByIdAndUpdate(id, data).lean();
  } catch (error) {
    throw error;
  }
};

const deleteById = async (id) => {
  try {
    return await Cart.findByIdAndDelete(id).lean();
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
