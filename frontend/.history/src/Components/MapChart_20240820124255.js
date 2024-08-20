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
    "St. Paul": [-93.09, 44.9537],
    Oakland: [-122.2712, 37.8044],
    Washington: [-77.0369, 38.9072],
    Seattle: [-122.3321, 47.6062],
    "Kansas City": [-94.5786, 39.0997],
    "Las Vegas": [-115.1398, 36.1699],
    Wichita: [-97.3301, 37.6872],
    Houston: [-95.3698, 29.7604],
    Dallas: [-96.797, 32.7767],
    Hialeah: [-80.2781, 25.8576],
    "San Jose": [-121.8863, 37.3382],
    Cincinnati: [-84.512, 39.1031],
    Laredo: [-99.5075, 27.5036],
    Boston: [-71.0589, 42.3601],
    Austin: [-97.7431, 30.2672],
    "Chula Vista": [-117.0842, 32.6401],
    "San Francisco": [-122.4194, 37.7749],
    Detroit: [-83.0458, 42.3314],
    Henderson: [-114.9817, 36.0395],
    "Fort Worth": [-97.3308, 32.7555],
    Jacksonville: [-81.6557, 30.3322],
    Aurora: [-104.8319, 39.7294],
    "Colorado Springs": [-104.8214, 38.8339],
    Denver: [-104.9903, 39.7392],
    "Jersey City": [-74.0431, 40.7178],
    Memphis: [-90.049, 35.1495],
    Toledo: [-83.5379, 41.6528],
    "Corpus Christi": [-97.3964, 27.8006],
    Columbus: [-82.9988, 39.9612],
    Chicago: [-87.6298, 41.8781],
    "Los Angeles": [-118.2437, 34.0522],
    "Santa Ana": [-117.8678, 33.7455],
    Lexington: [-84.5037, 38.0406],
    Tucson: [-110.9747, 32.2226],
    Riverside: [-117.3962, 33.9806],
    Gilbert: [-111.789, 33.3528],
    Buffalo: [-78.8784, 42.8864],
    Newark: [-74.1724, 40.7357],
    Bakersfield: [-119.0187, 35.3733],
    Tulsa: [-95.9928, 36.1539],
    Atlanta: [-84.388, 33.749],
    Minneapolis: [-93.265, 44.9778],
    Greensboro: [-79.791, 36.0726],
    "San Diego": [-117.1611, 32.7157],
    Baltimore: [-76.6122, 39.2904],
    Chattanooga: [-85.3097, 35.0456],
    "New York": [-74.006, 40.7128],
    Nashville: [-86.7816, 36.1627],
    "Oklahoma City": [-97.5164, 35.4676],
    Garland: [-96.6389, 32.9126],
    "St. Petersburg": [-82.6403, 27.7676],
    Orlando: [-81.3792, 28.5383],
    Honolulu: [-157.8583, 21.3069],
    "St. Louis": [-90.1994, 38.627],
    Tampa: [-82.4572, 27.9506],
    Charlotte: [-80.8431, 35.2271],
    Phoenix: [-112.074, 33.4484],
    Portland: [-122.6765, 45.5051],
    Philadelphia: [-75.1652, 39.9526],
    Glendale: [-112.185, 33.5387],
    Miami: [-80.1918, 25.7617],
    Cleveland: [-81.6944, 41.4993],
    Lincoln: [-96.6852, 40.8136],
    Arlington: [-97.1081, 32.7357],
    Indianapolis: [-86.1581, 39.7684],
    "Fort Wayne": [-85.1394, 41.0793],
    Anaheim: [-117.9143, 33.8366],
    Madison: [-89.4012, 43.0731],
    Raleigh: [-78.6382, 35.7796],
  };

  return (
    <div className="flex justify-center">
      <svg width="960" height="500">
        {worldMap.map((d, i) => (
          <path
            key={`path-${i}`}
            d={pathGenerator(d)}
            fill={`rgba(64, 145, 91,${(1 / worldMap.length) * i})`}
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
