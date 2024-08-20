const { MongoClient } = require("mongodb");
require("dotenv").config({ path: ".env.local" });
const uri = process.env.MONGODB_URL;

const connect = new MongoClient(uri);

async function newCustomer(range) {
  try {
    await connect.connect();
    console.log("Connected to MongoDB");
    const db = connect.db("RQ_Analytics");

    const startDate = calculateStartDate(range);

    const aggregateData = await db
      .collection("shopifyCustomers")
      .aggregate([
        {
          $addFields: {
            createdAtDate: {
              $dateFromString: { dateString: "$created_at" },
            },
          },
        },
        {
          $match: {
            createdAtDate: { $gte: startDate },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAtDate" },
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 }, // Sort by date in ascending order
        },
      ])
      .toArray();

    console.log("Aggregated Data:", aggregateData);

    return aggregateData;
  } catch (error) {
    console.error("Error fetching aggregated data from mongodb:", error);
  }

  function calculateStartDate(range) {
    const now = new Date();
    switch (range) {
      case "7days":
        return new Date(now.setDate(now.getDate() - 7));
      case "1month":
        return new Date(now.setMonth(now.getMonth() - 1));
      case "6months":
        return new Date(now.setMonth(now.getMonth() - 6));
      case "1year":
        return new Date(now.setFullYear(now.getFullYear() - 1));
      default:
        return new Date(0); // No range, get all data
    }
  }
}

module.exports = { newCustomer };
