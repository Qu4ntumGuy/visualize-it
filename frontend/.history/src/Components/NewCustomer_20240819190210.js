import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const NewCustomer = ({ fetchedData }) => {
  console.log(fetchedData);

  const labels = fetchedData.map((item) => item._id);

  const counts = fetchedData.map((item) => item.count);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "New Customers Added Over Time",
        data: counts,
        borderColor: "rgba(0, 201, 20,1)",
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "New Customers",
        },
      },
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <Line data={data} options={options} />
    </div>
  );
};

export default NewCustomer;
