const express = require("express");
const path = require("path");

const {
  cartController,
  foodController,
  userController,
} = require("./controllers/indexController");

const authCheck = require("./middlewares/authCheck");

const router = express.Router();

// Login Routes
router.post("/api/login", userController.login);
router.get("/api/auth", authCheck, userController.auth);
router.get("/api/logout", userController.logout);

// Food Routes

router
  .route("/api/food")
  .get(foodController.getAllFoods)
  .post(authCheck, foodController.addFood);
router
  .route("/api/food/id/:id")
  .get(authCheck, foodController.getFoodById)
  .put(authCheck, foodController.updateFood)
  .delete(authCheck, foodController.deleteFood);

router
  .route("/api/cart")
  .get(authCheck, cartController.getAllCarts)
  .post(cartController.addCart);
router
  .route("/api/cart/id/:id")
  .get(cartController.getCartById)
  .put(authCheck, cartController.updateCart)
  .delete(authCheck, cartController.deleteCart);

router.route("*").get((req, res) => {
  const filePath = path.resolve(
    __dirname,
    "..",
    "client",
    "dist",
    "index.html"
  );
  res.sendFile(filePath);
});

module.exports = router;
