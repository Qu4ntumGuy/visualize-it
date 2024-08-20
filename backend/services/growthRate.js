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

        // Step 4: Use $group again to calculate the growth rate
        {
          $group: {
            _id: null,
            data: {
              $push: {
                year: "$_id.year",
                month: "$_id.month",
                totalSales: "$totalSales",
              },
            },
          },
        },

        // Step 5: Use $project to calculate the growth rate within the array
        {
          $project: {
            data: {
              $map: {
                input: { $range: [1, { $size: "$data" }] },
                as: "index",
                in: {
                  year: { $arrayElemAt: ["$data.year", "$$index"] },
                  month: { $arrayElemAt: ["$data.month", "$$index"] },
                  totalSales: { $arrayElemAt: ["$data.totalSales", "$$index"] },
                  previousTotalSales: {
                    $cond: [
                      { $gt: ["$$index", 0] },
                      {
                        $arrayElemAt: [
                          "$data.totalSales",
                          { $subtract: ["$$index", 1] },
                        ],
                      },
                      null,
                    ],
                  },
                  salesGrowthRate: {
                    $cond: [
                      {
                        $and: [
                          { $gt: ["$$index", 0] },
                          {
                            $ne: [
                              {
                                $arrayElemAt: [
                                  "$data.totalSales",
                                  { $subtract: ["$$index", 1] },
                                ],
                              },
                              0,
                            ],
                          },
                        ],
                      },
                      {
                        $multiply: [
                          {
                            $divide: [
                              {
                                $subtract: [
                                  {
                                    $arrayElemAt: [
                                      "$data.totalSales",
                                      "$$index",
                                    ],
                                  },
                                  {
                                    $arrayElemAt: [
                                      "$data.totalSales",
                                      { $subtract: ["$$index", 1] },
                                    ],
                                  },
                                ],
                              },
                              {
                                $arrayElemAt: [
                                  "$data.totalSales",
                                  { $subtract: ["$$index", 1] },
                                ],
                              },
                            ],
                          },
                          100,
                        ],
                      },
                      0,
                    ],
                  },
                },
              },
            },
          },
        },

        // Step 6: Unwind the array back to individual documents
        {
          $unwind: "$data",
        },

        // Step 7: Final projection to get the desired fields
        {
          $project: {
            year: "$data.year",
            month: "$data.month",
            totalSales: "$data.totalSales",
            salesGrowthRate: "$data.salesGrowthRate",
          },
        },
      ])
      .toArray();
    console.log(aggregatedData);
    return aggregatedData;
  } catch (error) {
    console.error("Error fetching aggregated data from database:", error);
  }
}

module.exports = {
  growthRate,
};
