const { cartService } = require("../services/indexService");
const { handlingException } = require("../utils/error");
// Changing the cart controller query

const getAllCarts = async (req, res) => {
  try {
    const filter = req.query.filter ? { status: req.query.filter } : {};
    const sort = parseInt(req.query.sort)
      ? { updated_at: -1 }
      : { updated_at: 1 };
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 25;

    const carts = await cartService.findAllCart(filter, sort, page, limit);
    return res.status(200).json(carts);
  } catch (error) {
    handlingException(res, error);
  }
};

const getCartById = async (req, res) => {
  try {
    const cart = await cartService.findCartById(req.params.id);
    return res.status(200).json(cart);
  } catch (error) {
    handlingException(res, error);
  }
};

const addCart = async (req, res) => {
  try {
    const { token } = req.cookies;
    const data = await cartService.addCart(req.body, token ? true : false);
    return res.status(201).json(data);
  } catch (error) {
    handlingException(res, error);
  }
};

const updateCart = async (req, res) => {
  try {
    const data = await cartService.updateCartById(req.params.id, req.body);
    return res.status(201).json(data);
  } catch (error) {
    handlingException(res, error);
  }
};

const deleteCart = async (req, res) => {
  try {
    const data = await cartService.deleteCartById(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    handlingException(res, error);
  }
};

module.exports = {
  getAllCarts,
  getCartById,
  addCart,
  updateCart,
  deleteCart,
};
