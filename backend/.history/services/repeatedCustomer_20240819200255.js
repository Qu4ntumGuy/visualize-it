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

    const aggregateData = await db.collection("shopifyCustomers").aggregate([
      {
        $match: {
          created_at: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: "$customer_id",
          purchaseCount: { $sum: 1 },
        },
      },
      {
        $match: {
          purchaseCount: { $gt: 1 },
        },
      },
      {
        $count: "repeatCustomersCount",
      },
    ]);

    console.log("Aggregated Data:", aggregateData);

    return aggregateData;
  } catch (error) {
    console.error("Error fetching aggregated data from mongodb:", error);
  }
};

module.exports = repeatedCustomer;
