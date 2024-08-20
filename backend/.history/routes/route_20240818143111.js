const express = require("express");
const router = express.Router();
const { totalSalesController } = require("../Controllers/totalSalesController");

router.get("/totalSales", totalSalesController);

module.exports = router;
