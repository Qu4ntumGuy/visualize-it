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

  const labels = fetchedData.map(
    (item) => `${item.year}-${item.month || item.quarter}`
  );

  const newCustomers = fetchedData.map((item) => item.newCustomers);

  const colors = newCustomers.map((rate) =>
    rate >= 0 ? "rgba(75, 192, 192, 1)" : "rgba(255, 99, 132, 1)"
  );

  const data = {
    labels,
    datasets: [
      {
        label: "New Customers",
        data: newCustomers,
        segment: {
          borderColor: (ctx) => colors[ctx.p0DataIndex],
          backgroundColor: (ctx) => colors[ctx.p0DataIndex],
        },
        fill: false,
        tension: 0.4,
        pointHoverRadius: 7,
        borderWidth: 2,
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
