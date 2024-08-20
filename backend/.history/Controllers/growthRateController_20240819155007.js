async function growthRate(req, res) {
  try {
  } catch (error) {
    // console.error("Error fetching aggregated data:", error);
    res.status(500).send({
      message: "Error fetching aggregated data",
      error: error,
    });
  }
}
