const Category = require("../models/category");
const { MyError } = require("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");

const getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    success: true,
    data: categories,
  });
});

const getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    throw new MyError(`${req.params.id} category not found`, 400);
  }
  res.status(200).json({
    success: true,
    data: category,
  });
});

const createCategory = asyncHandler(async (req, res, next) => {
  const cateogry = await Category.create(req.body);

  res.status(200).json({
    success: true,
    data: "create category",
  });
});

const updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!category) {
    throw new MyError(`${req.params.id} update not found`, 400);
  }
  res.status(200).json({
    success: true,
    data: category,
  });
});

const deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    throw new MyError(`${req.params.id} delete not found`, 400);
  }
  res.status(200).json({
    success: true,
    data: category,
  });
});

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
