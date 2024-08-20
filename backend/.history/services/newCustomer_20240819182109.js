const { MongoClient } = require("mongodb");
require("dotenv").config({ path: ".env.local" });
const uri = process.env.MONGODB_URL;

const connect = new MongoClient(uri);

async function newCustomer() {
  try {
    await connect.connect();
    console.log("Connected to MongoDB");
    const db = connect.db("RQ_Analytics");

    const aggregateData = db
      .collection("shopifyCustomers")
      .aggregate([
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$created_at" },
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
    console.error("Error fetching aggregated data:", error);
  }
}
