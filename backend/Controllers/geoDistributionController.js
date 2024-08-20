const { geoDistribute } = require("../services/geoDistribute");

async function geoDistributionController(req, res) {
  try {
    const data = await geoDistribute();
    res.status(200).send({
      message: "growthRate",
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

module.exports = { geoDistributionController };
