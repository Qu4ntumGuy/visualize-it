const {
  dailyTotalSales,
  monthyTotalSales,
  quarterlyTotalSales,
  yearlyTotalSales,
} = require("../services/totalSales");

async function DailyTotalSalesController(req, res) {
  try {
    const data = await dailyTotalSales();
    res.status(200).send({
      message: "Total sales controller is working",
      data: data,
    });
  } catch (error) {
    // console.error("Error fetching aggregated data:", error);
    res.status(500).send({
      message: "Error fetching aggregated data",
      error: error,
    });
  }
}

async function MonthyTotalSalesController(req, res) {
  try {
    const data = await monthyTotalSales();
    res.status(200).send({
      message: "Total sales controller is working",
      data: data,
    });
  } catch (error) {
    // console.error("Error fetching aggregated data:", error);
    res.status(500).send({
      message: "Error fetching aggregated data",
      error: error,
    });
  }
}

async function QuarterlyTotalSalesController(req, res) {
  const data = await quarterlyTotalSales();

  res.status(200).send({
    message: "Total sales controller is working",
    data: data,
  });
}

async function YearlyTotalSalesController(req, res) {
  const data = await yearlyTotalSales();

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
