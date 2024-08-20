const growthRate = require("../services/growthRate");

async function growthRate(req, res) {
  try {
    const data = await growthRate();
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
