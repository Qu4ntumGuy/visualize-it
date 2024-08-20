import * as topojson from "topojson-client";
import { geoPath } from "d3-geo";
import { geoMercator } from "d3-geo";
import { select } from "d3-selection";
import { feature } from "topojson-client";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const MapChart = ({ geoData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/geoDistribute`
      );
      // console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const svg = select("svg");
    const projection = geoMercator();
    const pathGenerator = geoPath().projection(projection);

    const worldMap = feature(geoData, geoData.objects.countries).features;

    svg
      .selectAll("path")
      .data(worldMap)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("d", (d) => pathGenerator(d))
      .style("stroke", "black")
      .style("fill", "lightgrey");
  }, [geoData]);

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
