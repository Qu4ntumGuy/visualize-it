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

  const labels = data.map(
    (item) => `${item._id.year}-${item._id.month || item._id.quarter}`
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

  return <div></div>;
  //   <Line data={chartData} />;
};

export default GrowthRate;
