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

const GrowthRate = () => {
  const fetchData = async () => {
    try {
      axios
        .get("/api/sales-growth-rate")
        .then((response) => {
          const data = response.data;
          const labels = data.map(
            (item) => `${item._id.year}-${item._id.month || item._id.quarter}`
          );
          const growthRates = data.map((item) => item.growthRate);

          setChartData({
            labels: labels,
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
          });
        })
        .catch((error) => console.error("Error fetching data:", error));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};
