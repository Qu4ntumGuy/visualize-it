const { MongoClient } = require("mongodb");
require("dotenv").config({ path: ".env.local" });
const uri = process.env.MONGODB_URL;

const connect = new MongoClient(uri);

const geoDistribute = async () => {
  try {
    await connect.connect();
    console.log("Connected to MongoDB");
    const db = connect.db("RQ_Analytics");

    const aggregateData = await db
      .collection("shopifyOrders")
      .aggregate([
        {
          $group: {
            _id: "$default_address.city",
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    console.log("Aggregated Data:", aggregateData);
    return aggregateData;
  } catch (error) {
    console.error("Error fetching aggregated data from mongodb:", error);
  }
};

module.exports = { geoDistribute };
