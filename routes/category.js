const express = require("express");
const router = express.Router();
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category");

router
  .route("/:id")
  .delete(deleteCategory)
  .put(updateCategory)
  .get(getCategory);

router.route("/").get(getCategories).post(createCategory);

module.exports = router;
