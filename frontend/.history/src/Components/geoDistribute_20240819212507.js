import React, { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import { ChoroplethController, GeoFeature } from "chartjs-chart-geo";

const GeoDistribute = ({ fetchedData }) => {
  Chart.register(ChoroplethController, GeoFeature);
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
        projection: "equalEarth", // or another projection type
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
