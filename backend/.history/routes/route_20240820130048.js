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
const {
  repeatedCustomerController,
} = require("../Controllers/repeatedCustomerController");
const {
  geoDistributionController,
} = require("../Controllers/geoDistributionController");
const {
  lifetimePurchaseController,
} = require("../Controllers/lifetimePurchaseController");

router.get("/dailyTotalSales", DailyTotalSalesController);
router.get("/monthlyTotalSales", MonthyTotalSalesController);
router.get("/quarterlyTotalSales", QuarterlyTotalSalesController);
router.get("/yearlyTotalSales", YearlyTotalSalesController);

router.get("/growthRate", growthRateController);
router.post("/newCustomer", newCustomerController);
router.post("/repeatedCustomer", repeatedCustomerController);
router.get("/geoDistribute", geoDistributionController);
router.get("/purchase", lifetimePurchaseController);

module.exports = router;
