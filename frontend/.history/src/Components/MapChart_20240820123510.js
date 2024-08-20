import * as topojson from "topojson-client";
import { geoPath, geoMercator } from "d3-geo";
import { select } from "d3-selection";
import { useEffect, useState } from "react";
// import citiesData from "./citiesData"; // Assuming you import the data from a file or source

const MapChart = ({ data, citiesData }) => {
  const [worldMap, setWorldMap] = useState([]);

  useEffect(() => {
    if (data && data.objects && data.objects.countries) {
      const features = topojson.feature(data, data.objects.countries).features;
      setWorldMap(features);
    } else {
      console.error("World data is not in the expected format:", data);
    }
  }, [data]);

  const projection = geoMercator().scale(150).translate([480, 250]);
  const pathGenerator = geoPath().projection(projection);

  const cityCoordinates = {
    Plano: [-96.6989, 33.0198],
    "El Paso": [-106.485, 31.7619],
    Stockton: [-121.2908, 37.9577],
    "San Antonio": [-98.4936, 29.4241],
    "St. Paul": [-93.0898, 44.9537],
    Oakland: [-122.2711, 37.8044],
    Washington: [-77.0369, 38.9072],
    Seattle: [-122.3321, 47.6062],
    KansasCity: [-94.5786, 39.0997],
    "Las Vegas": [-115.1398, 36.1699],
    Wichita: [-97.3301, 37.6872],
    Houston: [-95.3698, 29.7604],
    Dallas: [-96.797, 32.7767],
    Hialeah: [-80.2781, 25.8576],
    "San Jose": [-121.8863, 37.3382],
    Cincinnati: [-84.512, 39.1031],
    Laredo: [-99.5075, 27.5036],
  };

  return (
    <div className="flex justify-center">
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

        {citiesData.map((city, i) => {
          const coordinates = cityCoordinates[city._id];
          if (coordinates) {
            const [x, y] = projection(coordinates);
            return (
              <circle
                key={`circle-${i}`}
                cx={x}
                cy={y}
                r={Math.sqrt(city.count) * 2}
                fill="rgba(255,0,0,0.6)"
                stroke="#FFFFFF"
                strokeWidth={0.5}
              >
                <title>{`${city._id}: ${city.count}`}</title>
              </circle>
            );
          }
          return null;
        })}
      </svg>
    </div>
  );
};

export default MapChart;
