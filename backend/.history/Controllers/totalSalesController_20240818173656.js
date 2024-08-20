const { dailyTotalSales } = require("../services/dailyTotalSales");

async function totalSalesController(req, res) {
  const data = await dailyTotalSales();

  res.status(200).send({
    message: "Total sales controller is working",
    data: data,
  });
}

module.exports = { totalSalesController };
