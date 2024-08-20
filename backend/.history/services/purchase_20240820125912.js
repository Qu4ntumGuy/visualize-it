const { MongoClient } = require("mongodb");
require("dotenv").config({ path: ".env.local" });
const uri = process.env.MONGODB_URL;

const connect = new MongoClient(uri);

async function purchase() {
  try {
    await connect.connect();
    console.log("Connected to MongoDB");
    const db = connect.db("RQ_Analytics");

    const startDate = calculateStartDate(range);

    const aggregateData = await db.collection("shopifyCustomers").aggregate([
      {
        // Convert `total_spent` to a number and format `created_at` to YYYY-MM
        $addFields: {
          totalSpent: { $toDouble: "$total_spent" },
          firstPurchaseMonth: {
            $dateToString: {
              format: "%Y-%m",
              date: { $dateFromString: { dateString: "$created_at" } },
            },
          },
        },
      },
      {
        // Group by the month of the first purchase
        $group: {
          _id: "$firstPurchaseMonth",
          cohortCustomers: { $sum: 1 },
          totalValue: { $sum: "$totalSpent" },
        },
      },
      {
        // Sort by the cohort month (optional)
        $sort: { _id: 1 },
      },
      {
        // Project the results
        $project: {
          _id: 0,
          cohort: "$_id",
          cohortCustomers: 1,
          totalValue: 1,
          averageValuePerCustomer: {
            $cond: {
              if: { $eq: ["$cohortCustomers", 0] },
              then: 0,
              else: { $divide: ["$totalValue", "$cohortCustomers"] },
            },
          },
        },
      },
    ]);
  } catch (error) {
    console.error("Error fetching aggregated data from mongodb:", error);
  }
}

module.exports = { purchase };
