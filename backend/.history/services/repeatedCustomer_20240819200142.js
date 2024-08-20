const { MongoClient } = require("mongodb");
require("dotenv").config({ path: ".env.local" });
const uri = process.env.MONGODB_URL;

const connect = new MongoClient(uri);

const repeatedCustomer = async (tf) => {
  try {
    await connect.connect();
    console.log("Connected to MongoDB");
    const db = connect.db("RQ_Analytics");

    const startDate = calculateStartDate(range);
  } catch (error) {}
};

module.exports = repeatedCustomer;
