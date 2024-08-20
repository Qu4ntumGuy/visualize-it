const { newCustomer } = require("../services/newCustomer");

async function repeatedCustomer(req, res) {
  try {
    const { range } = req.body;
    const data = await repeatedCustomer(range);
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

module.exports = { repeatedCustomer };
