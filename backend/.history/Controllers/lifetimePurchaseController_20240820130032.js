const { purchase } = require("../services/purchase");

async function lifetimePurchaseController(req, res) {
  try {
    const data = await purchase();
    res.status(200).send({
      message: "New Customer",
      data: data,
    });
  } catch (error) {
    // console.error("Error fetching aggregated data:", error);
    res.status(500).send({
      message: "Error fetching aggregated data this month",
      error: error,
    });
  }
}

module.exports = { lifetimePurchaseController };
