import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "axios";
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

const GrowthRate = ({ fetchedData }) => {
  console.log(fetchedData);

  const labels = fetchedData.map(
    (item) => `${item.year}-${item.month || item.quarter}`
  );

  const growthRates = fetchedData.map((item) => item.salesGrowthRate);

  const colors = growthRates.map((rate) =>
    rate >= 0 ? "rgba(75, 192, 192, 1)" : "rgba(255, 99, 132, 1)"
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Sales Growth Rate",
        data: growthRates,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Growth Rate (%)",
          font: {
            size: 16,
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Time Period",
          font: {
            size: 16,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          boxWidth: 20,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            label += `${context.parsed.y.toFixed(2)}%`;
            return label;
          },
        },
      },
    },
  };

  return (
    <div>
      {/* <Line data={data} />;
       */}

      <Line data={chartData} options={options} />
    </div>
  );
};

export default GrowthRate;
