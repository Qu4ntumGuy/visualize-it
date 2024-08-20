const { MongoClient } = require("mongodb");
require("dotenv").config({ path: ".env.local" });
const uri = process.env.MONGODB_URL;

const connect = new MongoClient(uri);

async function growthRate() {
  try {
    await connect.connect();
    console.log("Connected to MongoDB");
    const db = connect.db("RQ_Analytics");

    const aggregatedData = await db.collection("shopifyOrders").aggregate([
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
    ]);
  } catch (error) {
    console.error("Error fetching aggregated data:", error);
  }
}

module.exports = {
  growthRate,
};
