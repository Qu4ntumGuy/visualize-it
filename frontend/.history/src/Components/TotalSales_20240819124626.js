import React from "react";
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

const TotalSales = (salesData) => {
  console.log(salesData);
  // const labels = salesData.map((item) => `${item._id.month}/${item._id.year}`);

  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: "Total Sales",
  //       data: salesData.map((item) => item.totalSales),
  //       borderColor: "rgba(75, 192, 192, 1)",
  //       backgroundColor: "rgba(75, 192, 192, 0.2)",
  //       fill: true,
  //       tension: 0.3,
  //     },
  //     {
  //       label: "Sales Count",
  //       data: salesData.map((item) => item.count),
  //       borderColor: "rgba(153, 102, 255, 1)",
  //       backgroundColor: "rgba(153, 102, 255, 0.2)",
  //       fill: true,
  //       tension: 0.3,
  //     },
  //   ],
  // };

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //     title: {
  //       display: true,
  //       text: "Sales Data Over Time",
  //     },
  //   },
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //     },
  //   },
  // };

  // return <Line data={data} options={options} />;
};

export default TotalSales;
