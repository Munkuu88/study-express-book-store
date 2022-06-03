const getCategories = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "All categories controller",
  });
};

const getCategory = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "Get one category",
  });
};

const createCategory = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "create category",
  });
};

const updateCategory = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "Update category",
  });
};

const deleteCategory = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "Delete category",
  });
};
module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
