import React from "react";
import { Bar } from "react-chartjs-2";

function MapChart({ data }) {
  const barData = {
    labels: data.map((item) => item._id),
    datasets: [
      {
        label: "Customer Distribution by City",
        data: data.map((item) => item.count),
        backgroundColor: "rgba(75, 2, 102, 0.7)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Customer Count",
        },
      },
      x: {
        title: {
          display: true,
          text: "City",
        },
      },
    },
  };

  return <Bar data={barData} options={barOptions} />;
}

export default MapChart;
