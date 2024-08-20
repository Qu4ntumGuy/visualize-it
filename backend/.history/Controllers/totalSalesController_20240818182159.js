const { dailyTotalSales } = require("../services/totalSales");

async function DailyTotalSalesController(req, res) {
  const data = await dailyTotalSales();

  res.status(200).send({
    message: "Total sales controller is working",
    data: data,
  });
}

async function MonthyTotalSalesController(req, res) {
  const data = await dailyTotalSales();

  res.status(200).send({
    message: "Total sales controller is working",
    data: data,
  });
}

async function QuarterlyTotalSalesController(req, res) {
  const data = await dailyTotalSales();

  res.status(200).send({
    message: "Total sales controller is working",
    data: data,
  });
}

async function YearlyTotalSalesController(req, res) {
  const data = await dailyTotalSales();

  res.status(200).send({
    message: "Total sales controller is working",
    data: data,
  });
}

module.exports = {
  DailyTotalSalesController,
  MonthyTotalSalesController,
  QuarterlyTotalSalesController,
  YearlyTotalSalesController,
};
