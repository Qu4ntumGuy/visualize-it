const mongoose = require("mongoose");

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

async function fetchAggregatedData() {
  try {
    const db = mongoose.connection;

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
            totalSales: { $sum: "$total_price" },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
      ])
      .toArray();

    console.log("Aggregated Data:", aggregatedData);

    return aggregatedData;
  } catch (error) {
    console.error("Error fetching aggregated data:", error);
  }
}

module.exports = { fetchAggregatedData };
