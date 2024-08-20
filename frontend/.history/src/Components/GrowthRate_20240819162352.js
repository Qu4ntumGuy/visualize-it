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
        label: "Growth Rate",
        data: data.map((item) => item.growthRate),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return <div></div>;
  //   <Line data={chartData} />;
};

export default GrowthRate;
