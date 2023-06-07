const OrderModel = require("../models/Ordermodel");
const userModel = require("../models/usermodel");
const { hashPass, comparePass } = require("../utils/authUtils");
const jsonwebtoken = require("jsonwebtoken");

//========================Register===========================
const registerController = async (req, res) => {
  try {
    const { name, email, password, Phone, address, question } = req.body;

    //validations
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!Phone) {
      return res.send({ message: "Phone number is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!question) {
      return res.send({ message: "Question is Required" });
    }
    // existing  user
    const existingUser = await userModel.findOne({ email });
    // check users
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "This email address has already been registered.",
      });
    }
    // Register password
    console.log(password);
    const hashedPass = await hashPass(password);
    console.log(hashedPass);
    // Save Password
    const user = await userModel.create({
      name,
      email,
      Phone,
      address,
      password: hashedPass,
      question,
    });
    res.status(201).send({
      success: true,
      message: "User Registered Successfully.",
      user,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, error: "Error in registeration", error });
  }
};

//================================LOGIN====================================
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email && !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email and Password",
      });
    }
    // check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePass(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    // Token
    const token = await jsonwebtoken.sign(
      { _id: user._id },
      process.env.JWT_Token
    );
    console.log(token);
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.Phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error: "Error in Login", error });
  }
};

//========================= Forget Password route===========================
const forgotPasswordController = async (req, res) => {
  try {
    const { email, question, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!question) {
      res.status(400).send({ message: "Answer of the question is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, question });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPass(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, error: "Something went wrong", error });
  }
};

//========================= Test route===========================
const testController = (req, res) => {
  res.send("protected route");
};

//update prfole
const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, Phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPass(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        Phone: Phone || user.Phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

// //orders
const getOrdersController = async (req, res) => {
  try {
    const orders = await OrderModel.find({ Name: req.user._id });
    //  .populate("products", "-photo")
    //  .populate("Name", "name");
    console.log(req.user._id);

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//orders
const getAllOrdersController = async (req, res) => {
  try {
    const orders = await OrderModel.find({})
      .populate("products", "-photo")
      .populate("fName", "address")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};

// Taking orders
const orderController = async (req, res) => {
  try {
    const Name = req.user._id;
    const { products, payment, fName, email, address, country, zip, state } =
      req.body;

    if (!fName) {
      return res.send("Name is required");
    }
    if (!email) {
      return res.send("Email is required");
    }
    if (!address) {
      return res.send("Address is required");
    }
    if (!country) {
      return res.send("Country is required");
    }
    if (!zip) {
      return res.send("zip is required");
    }
    if (!state) {
      return res.send("state is required");
    }
    console.log(products);

    const order = await OrderModel.create({
      products,
      payment,
      Name,
      fName,
      email,
      address,
      country,
      zip,
      state,
    });
    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While taking Order",
      error,
    });
  }
};

module.exports = {
  loginController,
  registerController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  orderController,
};
