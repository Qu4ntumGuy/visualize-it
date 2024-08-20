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

    const aggregateData = db.collection("shopifyCustomers").aggregate([
      {
        $group: {
          _id: {
            customerId: "$customer.id",
            year: { $year: "$created_at" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $match: { count: { $gt: 1 } },
      },
      {
        $group: {
          _id: "$_id.customerId",
          yearlyOrders: { $push: "$_id.year" },
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "_id",
          foreignField: "id",
          as: "customerDetails",
        },
      },
      {
        $unwind: "$customerDetails",
      },
      {
        $project: {
          email: "$customerDetails.email",
          yearlyOrders: 1,
        },
      },
    ]);

    console.log("Aggregated Data:", aggregateData);

    // return aggregateData[0] ? aggregateData[0].repeatCustomersCount : 0;
    return aggregateData;
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
        return new Date(now.setFullYear(now.getFullYear() - 10));
      default:
        return new Date(0); // No range, get all data
    }
  }
};

module.exports = repeatedCustomer;
