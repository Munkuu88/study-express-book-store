const Category = require("../models/category");

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err,
    });
  }
};

const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(400).json({
        success: false,
        error: `${req.params.id} get not found`,
      });
    }
    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err,
    });
  }
};

const createCategory = async (req, res, next) => {
  try {
    const cateogry = await Category.create(req.body);

    res.status(200).json({
      success: true,
      data: "create category",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err,
    });
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      return res.status(400).json({
        success: false,
        error: `${req.params.id} update not found`,
      });
    }
    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err,
    });
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(400).json({
        success: false,
        error: `${req.params.id} delete not found`,
      });
    }
    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err,
    });
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
