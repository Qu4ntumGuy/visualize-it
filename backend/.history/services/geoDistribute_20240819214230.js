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
      .collection("shopifyCustomers")
      .aggregate([
        {
          $match: {
            "default_address.city": { $exists: true, $ne: null }, // Filter out documents with null or missing cities
          },
        },
        {
          $group: {
            _id: "$default_address.city", // Group by the city field
            count: { $sum: 1 }, // Count the number of occurrences for each city
          },
        },
        {
          $sort: { count: -1 }, // Optionally, sort by the count in descending order
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
