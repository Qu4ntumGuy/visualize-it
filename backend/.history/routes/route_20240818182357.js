const express = require("express");
const router = express.Router();
const {
  MonthyTotalSalesController,
  DailyTotalSalesController,
  QuarterlyTotalSalesController,
  YearlyTotalSalesController,
} = require("../Controllers/totalSalesController");

router.get("/dailyTotalSales", DailyTotalSalesController);
router.get("/monthlyTotalSales", MonthyTotalSalesController);
router.get("/quarterlyTotalSales", QuarterlyTotalSalesController);
router.get("/yearlyTotalSales", YearlyTotalSalesController);

module.exports = router;
