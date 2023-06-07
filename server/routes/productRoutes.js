const express = require("express");
const { requireSingIn, isAdmin } = require("../middlewares/authmiddleware");
const formidable = require("express-formidable");
const {
  createProductController,
  getProductsController,
  getProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  productFilterController,
  productCountController,
  searchController,
  realtedProductController,
  productCategoryController,
} = require("../controllers/productControllers");

//Route object
const route = express.Router();

//==================================Routes=======================================
// create product
route.post(
  "/create-product",
  requireSingIn,
  isAdmin,
  formidable(),
  createProductController
);

// Get all products
route.get("/get-products", getProductsController);

// Get single product
route.get("/get-product/:slug", getProductController);

//get photo
route.get("/product-photo/:id", productPhotoController);

//delete rproduct
route.delete(
  "/delete-product/:id",
  requireSingIn,
  isAdmin,
  deleteProductController
);

//Update product
route.put(
  "/update-product/:id",
  requireSingIn,
  isAdmin,
  formidable(),
  updateProductController
);

//Product Filters
route.post("/product-filter", productFilterController);

//Product Count
route.get("/product-count", productCountController);

//search Products
route.get("/search/:keyword", searchController);

//similar product
route.get("/related-product/:pid/:cid", realtedProductController);

//category pages
route.get("/product-category/:slug", productCategoryController);

module.exports = route;
