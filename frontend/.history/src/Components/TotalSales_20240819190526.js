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

const TotalSales = ({ dataType, fetchedData }) => {
  // console.log(dataType);
  const salesData = fetchedData;
  console.log(salesData);

  const labels = salesData.map((item) =>
    dataType === "dailyTotalSales"
      ? `${item._id.day}/${item._id.month}/${item._id.year}`
      : dataType === "monthlyTotalSales"
      ? `${item._id.month}/${item._id.year}`
      : dataType === "quarterlyTotalSales"
      ? `${item._id.quarter} ${item._id.year}`
      : `${item._id.year}`
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Total Sales",
        data: salesData.map((item) => item.totalSales),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "#4BC0C0",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Sales Count",
        data: salesData.map((item) => item.count),
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
        tension: 0.3,
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
        text: `Sales Data (${
          dataType.charAt(0).toUpperCase() + dataType.slice(1)
        })`,
      },
    },
    // scales: {
    //   y: {
    //     beginAtZero: true,
    //   },
    // },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Sales",
          font: {
            size: 16,
          },
        },
      },
      x: {
        title: {
          display: true,
          text: `Time Period (${
            dataType === "dailyTotalSales"
              ? "Day"
              : dataType === "monthlyTotalSales"
              ? "Month"
              : dataType === "quarterlyTotalSales"
              ? "Quarter"
              : "Year"
          })`,
          font: {
            size: 16,
          },
        },
      },
    },
  };

  return;
  <div className="bg-white p-4 rounded-md shadow-lg">
    <Line data={data} options={options} />;
  </div>;
};

export default TotalSales;
