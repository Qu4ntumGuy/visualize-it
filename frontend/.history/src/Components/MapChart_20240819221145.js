import React, { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import {
  ChoroplethController,
  ChoroplethElement,
  Legend,
} from "chartjs-chart-geo";
import { AlbersUsA } from "chartjs-chart-geo";
import { Tooltip } from "chart.js";

// Register the components required
Chart.register(
  ...registerables,
  ChoroplethController,
  ChoroplethElement,
  Legend,
  Tooltip
);

const MapChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    new Chart(ctx, {
      type: "choropleth",
      data: {
        datasets: [
          {
            label: "Customer Distribution",
            data: data.map((d) => ({
              feature: d._id,
              value: d.count,
            })),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
          },
        },
        geo: {
          projection: "albersUsA", // Choose the projection based on your map
        },
      },
    });
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default MapChart;
