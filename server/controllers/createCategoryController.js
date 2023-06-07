const categoryModel = require("../models/categoryModel");
const slugify = require("slugify");

const createCategoryController = async (req, res) => {
  console.log(req.body);
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    console.log(existingCategory);
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exists",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    console.log(category);
    res.status(201).send({
      success: true,
      message: "New category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updating Category",
    });
  }
};

// const createCategoryController = async (req, res) => {
//   console.log("sendingggg");
//   console.log(req.body);
//     try {
//       const { name } = req.body;
//       if (!name) {
//         return res.status(401).send({ message: "Name is required" });
//       }
//       const existingCategory = await categoryModel.findOne({ name });
//       console.log(existingCategory);
//       if (existingCategory) {
//         return res.status(200).send({
//           success: false,
//           message: "Category Already Exists",
//         });
//       }
//       const category = await new categoryModel.create({name});
//       console.log(category);
//       res.status(201).send({
//         success: true,
//         message: "New category created",
//         category,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         success: false,
//         error,
//         message: "Error in Category"
//       });
//     }
//   };

//updating Category
const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    console.log(category);
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updating Category",
    });
  }
};

// getting all categories
const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find();
    console.log(category);
    res.status(200).send({
      success: true,
      message: "List of all Categories",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all Categories",
    });
  }
};

//Getting single category
const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    console.log(category);
    res.status(200).send({
      success: true,
      message: "Successfully Get single Category",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting Category",
    });
  }
};

// Delete category
const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    console.log(category);
    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while deleting Category",
    });
  }
};

module.exports = {
  createCategoryController,
  updateCategoryController,
  categoryController,
  singleCategoryController,
  deleteCategoryController,
};
