import * as topojson from "topojson-client";
import { geoPath } from "d3-geo";
import { geoMercator } from "d3-geo";
import { select } from "d3-selection";
import { feature } from "topojson-client";
import { useEffect } from "react";

const MapChart = ({ data }) => {
  useEffect(() => {
    const svg = select("svg");
    const projection = geoMercator();
    const pathGenerator = geoPath().projection(projection);

    const worldMap = topojson.feature(data, data.objects.countries).features;

    const data = {
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
        
    </div>

  );
};

export default MapChart;
