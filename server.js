const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const { logger } = require("./middleware/logger");
const categoriesRoutes = require("./routes/category");
const { Stream } = require("stream");

dotenv.config({ path: "./config/config.env" });

var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

const app = express();
app.use(logger);
app.use(morgan("combined", { stream: accessLogStream }));
app.use("/api/v1/categories", categoriesRoutes);

app.listen(process.env.PORT, () => {
  console.log(process.env.NODE_ENV);
});
