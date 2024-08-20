const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });

const mongoURL = `${process.env.MONGODB_URL}`;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL, {
      dbName: "RQ_Analytics",
    });
    console.log("MongoDB is connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
