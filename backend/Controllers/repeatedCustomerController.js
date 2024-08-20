const repeatedCustomer = require("../services/repeatedCustomer");

async function repeatedCustomerController(req, res) {
  try {
    const { timeframe } = req.body;
    const data = await repeatedCustomer(timeframe);
    res.status(200).send({
      message: "repeatCustomer",
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

module.exports = { repeatedCustomerController };
