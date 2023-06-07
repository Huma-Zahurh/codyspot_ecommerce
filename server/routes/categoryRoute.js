const express = require("express");
const { requireSingIn, isAdmin } = require("../middlewares/authmiddleware");
const {
  createCategoryController,
  updateCategoryController,
  categoryController,
  singleCategoryController,
  deleteCategoryController,
} = require("../controllers/createCategoryController");

//Route object

const route = express.Router();

//==================================Routes=======================================
// create category
route.post("/create-category", createCategoryController);

//Update category
route.put(
  "/update-category/:id",
  requireSingIn,
  isAdmin,
  updateCategoryController
);

// Get all categories
route.get("/get-category", categoryController);

// single category
route.get("/single-category/:slug", singleCategoryController);

//Delete category
route.delete(
  "/delete-category/:id",
  requireSingIn,
  isAdmin,
  deleteCategoryController
);

module.exports = route;
