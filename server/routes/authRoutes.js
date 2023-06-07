const express = require("express");
const {
  loginController,
  registerController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  orderController,
} = require("../controllers/authControllers");
const { requireSingIn, isAdmin } = require("../middlewares/authmiddleware");

//Route object
const route = express.Router();

//==================================Routes================================================

// Register post route
route.post("/register", registerController);

// Login post route
route.post("/login", loginController);

//Forgot Password
route.post("/forgot-password", forgotPasswordController);

// Test Route
route.get("/test", requireSingIn, isAdmin, testController);

//Protected user route
route.get("/user-auth", requireSingIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//Protected admin route
route.get("/admin-auth", requireSingIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
route.put("/profile", requireSingIn, updateProfileController);

//orders
route.get("/orderss", requireSingIn, getOrdersController);

//all orders
route.get("/all-orders", requireSingIn, isAdmin, getAllOrdersController);

// order status update
route.put(
  "/order-status/:orderId",
  requireSingIn,
  isAdmin,
  orderStatusController
);

//Taking Orders
route.post("/order", requireSingIn, orderController);

module.exports = route;
