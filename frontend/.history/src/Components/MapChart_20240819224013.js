// MapChart.js
import React, { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { ChoroplethChart } from "chartjs-chart-geo";
import { geoAlbersUsa } from "chartjs-chart-geo";

// Register the necessary components
Chart.register(...registerables, ChoroplethChart);

const MapChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    // Clean up previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstanceRef.current = new Chart(ctx, {
      type: "choropleth",
      data: {
        datasets: [
          {
            label: "Customer Distribution",
            data: data.map((d) => ({
              feature: d._id, // Ensure _id matches GeoJSON feature identifiers
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
            position: "top",
          },
        },
        geo: {
          projection: geoAlbersUsa(),
        },
      },
    });

    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} id="map-chart-canvas" />;
};

export default MapChart;
