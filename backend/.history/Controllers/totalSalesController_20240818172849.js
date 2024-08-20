const { fetchAggregatedData } = require("../services/dailyTotalSales");

async function totalSalesController(req, res) {
  const data = await fetchAggregatedData();

  res.status(200).send({
    message: "Total sales controller is working",
  });
}

module.exports = { totalSalesController };
