const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: ".env.local" });
const uri = process.env.MONGODB_URL;

// const connect = new MongoClient(uri);

const mongoose = mongoose
  .connect(uri, {
    dbName: "RQ_Analytics",
  })
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

async function dailyTotalSales() {
  try {
    const db = mongoose.connection;
    // console.log(db.collection("shopifyOrders").find());
    const orders = await db.collection("shopifyOrders").find();

    const testAggregation = await db.collection("shopifyOrders").aggregate([
      { $limit: 2 },
      {
        $project: {
          date: { $dateFromString: { dateString: "$created_at" } },
          amount: { $toDouble: "$total_price_set.shop_money.amount" },
        },
      },
    ]);

    const aggregatedData = await db
      .collection("shopifyOrders")
      .aggregate([
        {
          $group: {
            _id: {
              day: { $dayOfMonth: "$created_at" },
              month: { $month: "$created_at" },
              year: { $year: "$created_at" },
            },
            totalSales: {
              $sum: {
                $toDouble: "$total_price_set.shop_money.amount",
              },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
      ])
      .toArray();

    console.log("Aggregated Data:", aggregatedData);

    return orders;
    // return aggregatedData;
  } catch (error) {
    console.error("Error fetching aggregated data:", error);
  }
}

module.exports = { dailyTotalSales };
