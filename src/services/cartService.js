const { foodRepo, cartRepo } = require("../repositories/indexRepo");

const findAllCart = async (filter, sort, page, limit) => {
  try {
    const skip = (page - 1) * limit;
    return await cartRepo.findAll(filter, sort, skip, limit);
  } catch (error) {
    throw error;
  }
};

const findCartById = async (id) => {
  try {
    return await cartRepo.findOneById(id);
  } catch (error) {
    throw error;
  }
};

const addCart = async (data, auth) => {
  try {
    let grandTotal = 0;
    // No optimization (n+1) error! For quick dev
    if (data.orders) {
      for (let i = 0; i < data.orders.length; i++) {
        const food = await foodRepo.findOneById(data.orders[i].food._id);
        data.orders[i].food.name = food.name;
        data.orders[i].food.price = food.price;
        data.orders[i].subtotal = food.price * data.orders[i].quantity;
        grandTotal += data.orders[i].subtotal;
      }
      data.grand_total = grandTotal;
    }
    // If the user is unauthenticated can not change the status
    if (!auth) {
      data.status = "pending";
    }
    return await cartRepo.insert(data);
  } catch (error) {
    throw error;
  }
};

const updateCartById = async (id, data) => {
  try {
    // No optimization (n+1) error! For quick dev
    if (data.orders) {
      for (let i = 0; i < data.orders.length; i++) {
        const food = await foodRepo.findOneById(data.orders[i].food._id);
        data.orders[i].food.name = food.name;
        data.orders[i].food.price = food.price;
        data.orders[i].subtotal = food.price * data.orders[i].quantity;
        grandTotal += data.orders[i].subtotal;
      }
      data.grand_total = grandTotal;
    }

    return await cartRepo.updateById(id, data);
  } catch (error) {
    throw error;
  }
};

const deleteCartById = async (id) => {
  try {
    return await cartRepo.deleteById(id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findAllCart,
  findCartById,
  addCart,
  updateCartById,
  deleteCartById,
};
