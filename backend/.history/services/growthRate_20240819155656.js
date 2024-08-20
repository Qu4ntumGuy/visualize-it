const { MongoClient } = require("mongodb");
require("dotenv").config({ path: ".env.local" });
const uri = process.env.MONGODB_URL;

const connect = new MongoClient(uri);

async function growthRate() {
  try {
    await connect.connect();
    console.log("Connected to MongoDB");
    const db = connect.db("RQ_Analytics");

    const aggregatedData = await db
      .collection("shopifyOrders")
      .aggregate([
        {
          $project: {
            year: { $year: { $toDate: "$created_at" } },
            month: { $month: { $toDate: "$created_at" } },
            total_price: { $toDouble: "$total_price" },
          },
        },

        // Step 2: Group by year and month, summing up the total sales
        {
          $group: {
            _id: { year: "$year", month: "$month" },
            totalSales: { $sum: "$total_price" },
          },
        },

        // Step 3: Sort by year and month to ensure the data is in chronological order
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },

        // Step 4: Calculate the sales growth rate by comparing to the previous period
        {
          $setWindowFields: {
            sortBy: { "_id.year": 1, "_id.month": 1 },
            output: {
              previousSales: {
                $shift: {
                  output: "$totalSales",
                  by: -1, // Shift by -1 to get the previous period's sales
                },
              },
              salesGrowthRate: {
                $multiply: [
                  {
                    $cond: {
                      if: { $eq: ["$previousSales", 0] }, // Avoid division by zero
                      then: 0,
                      else: {
                        $divide: [
                          { $subtract: ["$totalSales", "$previousSales"] },
                          "$previousSales",
                        ],
                      },
                    },
                  },
                  100, // Convert to percentage
                ],
              },
            },
          },
        },

        // Step 5: Project the final output
        {
          $project: {
            _id: 0,
            year: "$_id.year",
            month: "$_id.month",
            totalSales: 1,
            previousSales: 1,
            salesGrowthRate: 1,
          },
        },
      ])
      .toArray();
    return aggregatedData;
  } catch (error) {
    console.error("Error fetching aggregated data from database:", error);
  }
}

module.exports = {
  growthRate,
};
