const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category must be required"],
    unique: true,
    trim: true,
    maxlength: [50, "Categoty's letter max lenght is 50, letter"],
  },
  description: {
    type: String,
    required: [true, "Description must be required"],
    trim: true,
  },
  image: {
    type: String,
    required: true,
    default:
      "https://images-na.ssl-images-amazon.com/images/I/51kfFS5-fnL._SX332_BO1,204,203,200_.jpg",
  },
  averageRating: {
    type: Number,
    min: [1, "Rating less value is 1"],
    max: [10, "Rating max value is 1"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Category", CategorySchema);
