function totalSalesController(req, res) {
  res.status(200).send({
    message: "Total sales controller is working",
    data: [
      {
        id: 1,
        name: "Product 1",
        price: 100,
        quantity: 10,
        total: 1000,
      },
      {
        id: 2,
        name: "Product 2",
        price: 200,
        quantity: 5,
        total: 1000,
      },
    ],
  });
}

module.exports = { totalSalesController };
