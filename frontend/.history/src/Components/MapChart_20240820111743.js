import React, { useEffect, useRef } from "react";
import { Bar, Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js/auto";
import { ProjectionScale } from "chartjs-chart-geo";

function MapChart({ data }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

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

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      //   y: {
      //     beginAtZero: true,
      //     title: {
      //       display: true,
      //       text: "Customer Count",
      //     },
      //   },
      //   x: {
      //     title: {
      //       display: true,
      //       text: "City",
      //     },
      //   },
      projection: {
        axis: "x",
        projection: "equalEarth",
      },
    },
  };

  useEffect(() => {
    // Destroy the existing chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create a new chart instance
    chartInstanceRef.current = new Chart(chartRef.current, {
      type: "bar", // or any other chart type
      barData,
      options,
    });

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data, options]);

  return <Chart type="choropleth" data={barData} options={options} />;
}

export default MapChart;
