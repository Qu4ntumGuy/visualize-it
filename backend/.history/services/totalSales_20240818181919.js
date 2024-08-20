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

    const aggregatedData = await db
      .collection("shopifyOrders")
      .aggregate([
        {
          $addFields: {
            createdAtDate: {
              $dateFromString: {
                dateString: "$created_at",
                timezone: "UTC", // Adjust timezone if necessary
              },
            },
          },
        },
        {
          $group: {
            _id: {
              day: { $dayOfMonth: "$createdAtDate" },
              month: { $month: "$createdAtDate" },
              year: { $year: "$createdAtDate" },
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

    return aggregatedData;
    // return aggregatedData;
  } catch (error) {
    console.error("Error fetching aggregated data:", error);
  }
}

async function monthyTotalSales() {
  try {
    // const db = connect.connection;
    await connect.connect();
    console.log("Connected to MongoDB");
    const db = connect.db("RQ_Analytics");

    const aggregatedData = await db
      .collection("shopifyOrders")
      .aggregate([
        {
          $addFields: {
            createdAtDate: {
              $dateFromString: {
                dateString: "$created_at",
                timezone: "UTC", // Adjust timezone if necessary
              },
            },
          },
        },
        {
          $group: {
            _id: {
              month: { $month: "$createdAtDate" },
              year: { $year: "$createdAtDate" },
            },
            totalSales: {
              $sum: {
                $toDouble: "$total_price_set.shop_money.amount",
              },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ])
      .toArray();

    console.log("Aggregated Data:", aggregatedData);

    return aggregatedData;
    // return aggregatedData;
  } catch (error) {
    console.error("Error fetching aggregated data:", error);
  }
}

async function quarterlyTotalSales() {
  try {
    // const db = connect.connection;
    await connect.connect();
    console.log("Connected to MongoDB");
    const db = connect.db("RQ_Analytics");

    const aggregatedData = await db
      .collection("shopifyOrders")
      .aggregate([
        {
          $addFields: {
            createdAtDate: {
              $dateFromString: {
                dateString: "$created_at",
                timezone: "UTC", // Adjust timezone if necessary
              },
            },
          },
        },
        {
          $group: {
            _id: {
              quarter: {
                $ceil: {
                  $divide: [{ $month: "$createdAtDate" }, 3],
                },
              },
              year: { $year: "$createdAtDate" },
            },
            totalSales: {
              $sum: {
                $toDouble: "$total_price_set.shop_money.amount",
              },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.quarter": 1 } },
      ])
      .toArray();

    console.log("Aggregated Data:", aggregatedData);

    return aggregatedData;
    // return aggregatedData;
  } catch (error) {
    console.error("Error fetching aggregated data:", error);
  }
}

async function yearlyTotalSales() {
  try {
    // const db = connect.connection;
    await connect.connect();
    console.log("Connected to MongoDB");
    const db = connect.db("RQ_Analytics");

    const aggregatedData = await db
      .collection("shopifyOrders")
      .aggregate([
        {
          $addFields: {
            createdAtDate: {
              $dateFromString: {
                dateString: "$created_at",
                timezone: "UTC", // Adjust timezone if necessary
              },
            },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAtDate" },
            },
            totalSales: {
              $sum: {
                $toDouble: "$total_price_set.shop_money.amount",
              },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1 } },
      ])
      .toArray();

    console.log("Aggregated Data:", aggregatedData);

    return aggregatedData;
    // return aggregatedData;
  } catch (error) {
    console.error("Error fetching aggregated data:", error);
  }
}

module.exports = { dailyTotalSales, monthyTotalSales };
