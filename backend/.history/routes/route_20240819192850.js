const express = require("express");
const router = express.Router();
const {
  MonthyTotalSalesController,
  DailyTotalSalesController,
  QuarterlyTotalSalesController,
  YearlyTotalSalesController,
} = require("../Controllers/totalSalesController");
const { growthRateController } = require("../Controllers/growthRateController");
const {
  newCustomerController,
} = require("../Controllers/newCustomerController");

router.get("/dailyTotalSales", DailyTotalSalesController);
router.get("/monthlyTotalSales", MonthyTotalSalesController);
router.get("/quarterlyTotalSales", QuarterlyTotalSalesController);
router.get("/yearlyTotalSales", YearlyTotalSalesController);

router.get("/growthRate", growthRateController);
router.post("/newCustomer", newCustomerController);

module.exports = router;
