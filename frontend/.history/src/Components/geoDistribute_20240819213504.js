import React, { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import { ChoroplethController, GeoFeature } from "chartjs-chart-geo";

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
  Legend,
  ChoroplethController,
  GeoFeature
);

const GeoDistribute = ({ fetchedData }) => {
  const citiesData = fetchedData;

  const mapData = citiesData.map((city) => ({
    feature: city._id,
    value: city.count,
  }));

  const data = {
    labels: citiesData.map((city) => city._id),
    datasets: [
      {
        label: "Customer Distribution by City",
        data: mapData,
      },
    ],
  };

  const options = {
    scales: {
      xy: {
        projection: "equalEarth", // Ensure this projection type is supported and registered
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
