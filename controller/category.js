const Category = require("../models/category");
const { MyError } = require("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");

const getCategories = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  delete req.query.page;
  const limit = parseInt(req.query.limit);
  delete req.query.limit || 2;

  total = await Category.countDocuments();
  const pageCount = Math.ceil(total / limit);
  const start = (page - 1) * limit + 1;
  let end = start + limit - 1;
  if (end > total) end = total;

  const pagination = { total, pageCount, start, end };

  if (page < pageCount) pagination.nextPage = page + 1;
  if (page > 1) pagination.prevPage = page - 1;

  const categories = await Category.find()
    .skip(start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    data: categories,
    pagination,
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
  const category = await Category.create(req.body);

  res.status(200).json({
    success: true,
    data: category,
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
