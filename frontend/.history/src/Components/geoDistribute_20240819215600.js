import React, { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import {
  ChoroplethController,
  ColorScale,
  GeoFeature,
  ProjectionScale,
} from "chartjs-chart-geo";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  registerables,
} from "chart.js";

// Register the necessary components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ...registerables,
  ChoroplethController,
  GeoFeature,
  ProjectionScale,
  ColorScale
);

const GeoDistribute = ({ fetchedData }) => {
  const citiesData = fetchedData;
  console.log(citiesData);
  const mapData = citiesData.map((city) => ({
    feature: city._id, // This should be the city name
    value: city.count, // The count of customers in that city
  }));

  const data = {
    labels: citiesData.map((city) => city._id),
    datasets: [
      {
        label: "Customer Distribution by City",
        data: citiesData.map((city) => ({
          feature: city._id,
          value: city.count,
        })),
        borderWidth: 1,
        outline: { borderColor: "#000" },
      },
    ],
  };

  const options = {
    scales: {
      projection: {
        axis: "x",
        projection: "albersUsa",
      },
      color: {
        axis: "x",
        quantize: 5,
        legend: {
          position: "bottom-right",
          align: "bottom",
        },
      },
    },
  };

  return (
    <div>
      <Chart type="choropleth" data={data} options={options} />
    </div>
  );
};

export default GeoDistribute;
