import * as topojson from "topojson-client";
import { geoPath, geoMercator } from "d3-geo";
import { select } from "d3-selection";
import { useEffect, useState } from "react";

const MapChart = ({ data }) => {
  const [worldMap, setWorldMap] = useState([]);

  useEffect(() => {
    if (data && data.objects && data.objects.countries) {
      const features = topojson.feature(data, data.objects.countries).features;
      setWorldMap(features);
    } else {
      console.error("Data is not in the expected format:", data);
    }
  }, [data]);

  const projection = geoMercator();
  const pathGenerator = geoPath().projection(projection);

  return (
    <div className="flex justify-center w-full">
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
