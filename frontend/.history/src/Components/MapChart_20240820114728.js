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

    const worldMap = topojson.feature(data, data.objects);

    svg
      .selectAll("path")
      .data(worldMap)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("d", (d) => pathGenerator(d))
      .style("stroke", "black")
      .style("fill", "lightgrey");
  }, [data]);

  return (
    <svg
      width={800}
      height={400}
      viewBox="0 0 800 400"
      preserveAspectRatio="xMidYMid meet"
    ></svg>
  );
};

export default MapChart;
