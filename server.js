const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const colors = require("colors");

const { logger } = require("./middleware/logger");
const categoriesRoutes = require("./routes/category");
const { connectDB } = require("./db");
const { errorHandler } = require("./middleware/error");

dotenv.config({ path: "./config/config.env" });

const app = express();

connectDB();

var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

app.use(express.json());
app.use(logger);
app.use(morgan("combined", { stream: accessLogStream }));
app.use("/api/v1/categories", categoriesRoutes);
app.use(errorHandler);

const server = app.listen(process.env.PORT, () => {
  console.log(`Running port: ${process.env.PORT}`.green.bold);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error message: ${err}`.red.bold);
  server.close(() => {
    process.exit(1);
  });
});
