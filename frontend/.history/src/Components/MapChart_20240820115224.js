import * as topojson from "topojson-client";
import { geoPath } from "d3-geo";
import { geoMercator } from "d3-geo";
import { select } from "d3-selection";
import { feature } from "topojson-client";
import { useEffect } from "react";

const MapChart = ({ data }) => {
  const svg = select("svg");
  const projection = geoMercator();
  const pathGenerator = geoPath().projection(projection);

  const worldMap = topojson.feature(data, data.objects.countries).features;

  const geoData = {
    labels: worldMap.map((item) => item.properties.name),
    datasets: [
      {
        label: "Customer Count",
        data: worldMap.map((item) => item.properties.customerCount),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.3)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <div>
      <svg width="960" height="500">
        {worldMap.map((d, i) => (
          <path
            key={`path-${i}`}
            d={pathGenerator(d)}
            fill={`rgba(38,50,56,${(1 / worldMap.length) * i})`}
            stroke="#FFFFFF"
            strokeWidth={0.5}
          />
        ))}
      </svg>
    </div>
  );
};

export default MapChart;
