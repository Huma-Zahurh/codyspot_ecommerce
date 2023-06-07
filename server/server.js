const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const connectDb = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const categoryRoute = require("./routes/categoryRoute");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");

// database config
connectDb();

//rest object
const app = express();

//midwares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>first route is here</h1>");
});

//port
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started successfully at port ${PORT}`);
});
