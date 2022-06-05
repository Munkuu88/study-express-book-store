const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Category = require("./models/category");

dotenv.config({ path: "./config/config.env" });

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
});

const categories = JSON.parse(
  fs.readFileSync(__dirname + "/data/categories.json", "utf-8")
);

const importData = async () => {
  try {
    await Category.create(categories);
    console.log("success to import");
  } catch (err) {
    console.log(err.red);
  }
};

const deleteData = async () => {
  try {
    await Category.deleteMany();
    console.log("success to delete");
  } catch (err) {
    console.log(err.red);
  }
};

if (process.argv[2] == "-i") {
  importData();
} else {
  if (process.argv[2] == "-d") deleteData();
}
