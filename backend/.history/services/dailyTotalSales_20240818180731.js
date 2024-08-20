const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: ".env.local" });
const uri = process.env.MONGODB_URL;

const connect = new MongoClient(uri);

async function dailyTotalSales() {
  try {
    // const db = connect.connection;
    await connect.connect();
    console.log("Connected to MongoDB");
    const db = connect.db("RQ_Analytics");
    // console.log(db.collection("shopifyOrders").find());
    const orders = await db
      .collection("shopifyOrders")
      .find()
      .limit(2)
      .toArray();

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
