const { MongoClient } = require("mongodb");
require("dotenv").config({ path: ".env.local" });
const uri = process.env.MONGODB_URL;

const connect = new MongoClient(uri);

const repeatedCustomer = async (timeFrame) => {
  try {
    await connect.connect();
    console.log("Connected to MongoDB");
    const db = connect.db("RQ_Analytics");

    const startDate = calculateStartDate(timeFrame);

    const aggregateData = await db
      .collection("shopifyCustomers")
      .aggregate([
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
      ])
      .toArray();

    console.log("Aggregated Data:", aggregateData);

    return aggregateData[0] ? aggregateData[0].repeatCustomersCount : 0;
  } catch (error) {
    console.error("Error fetching aggregated data from mongodb:", error);
  }

  function calculateStartDate(timeFrame) {
    const now = new Date();
    switch (timeFrame) {
      case "daily":
        return new Date(now.setDate(now.getDate() - 1));
      case "monthly":
        return new Date(now.setMonth(now.getMonth() - 1));
      case "quarterly":
        return new Date(now.setMonth(now.getMonth() - 3));
      case "yearly":
        return new Date(now.setFullYear(now.getFullYear() - 1));
      default:
        return new Date(0); // No range, get all data
    }
  }
};

module.exports = repeatedCustomer;
