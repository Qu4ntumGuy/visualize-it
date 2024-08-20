const { newCustomer } = require("../services/newCustomer");

async function newCustomerController(req, res) {
  try {
    const data = await newCustomer();
    res.status(200).send({
      message: "New Customer",
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

module.exports = { newCustomerController };
