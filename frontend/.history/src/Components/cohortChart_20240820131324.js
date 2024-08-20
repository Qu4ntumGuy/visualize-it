import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

function CohortChart({ data }) {
  console.log(data);

  const chartData = {
    labels: data.map((item) => item.cohort),
    datasets: [
      {
        label: "Total Lifetime Value",
        data: data.map((item) => item.cohortCustomers),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Customer Lifetime Value by Cohort",
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

export default CohortChart;
