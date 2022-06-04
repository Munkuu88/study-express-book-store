const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  });

  console.log(`MongoDB connection: ${conn.connection.host}`.green.bold);
};

module.exports = { connectDB };
