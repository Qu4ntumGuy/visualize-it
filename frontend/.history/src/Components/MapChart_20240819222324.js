// MapChart.js
import React, { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { ChoroplethChart } from "chartjs-chart-geo";
import { geoAlbersUsa } from "chartjs-chart-geo";
import { Tooltip } from "chart.js";
import countries50m from "world-atlas/countries-50m.json";

// Register the necessary components
Chart.register(...registerables, ChoroplethChart, Tooltip);

const MapChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    // Destroy the previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create a new chart instance
    const ctx = chartRef.current.getContext("2d");
    chartInstanceRef.current = new Chart(ctx, {
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
      //   options: {
      //     plugins: {
      //       legend: {
      //         display: true,
      //         position: "top",
      //       },
      //       tooltip: {
      //         callbacks: {
      //           label: function (context) {
      //             return `${context.label}: ${context.raw}`;
      //           },
      //         },
      //       },
      //     },
      //     geo: {
      //       projection: geoAlbersUsa(), // Use the corrected projection name
      //     },
      //   },
      options: {
        scales: {
          projection: {
            axis: "x",
            projection: "equalEarth",
          },
          color: {
            axis: "x",
            quantize: 5,
            legend: {
              position: "bottom-right",
              align: "right",
            },
          },
        },
      },
    });

    // Cleanup function to destroy the chart when the component is unmounted or data changes
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} id="map-chart-canvas" />;
};

export default MapChart;
