import React from "react";
import { Bar, Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js/auto";

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

  return <Chart type="choropleth" data={barData} options={barOptions} />;
}

export default MapChart;
