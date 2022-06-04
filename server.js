const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const colors = require("colors");

const { logger } = require("./middleware/logger");
const categoriesRoutes = require("./routes/category");
const { connectDB } = require("./db");

dotenv.config({ path: "./config/config.env" });

connectDB();

var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

const app = express();
app.use(logger);
app.use(morgan("combined", { stream: accessLogStream }));
app.use("/api/v1/categories", categoriesRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log(`Running port: ${process.env.PORT}`.green.bold);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error message: ${err}`.red.bold);
  server.close(() => {
    process.exit(1);
  });
});
