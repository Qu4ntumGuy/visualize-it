import React from "react";
import { Chart } from "react-google-charts";

// export const data = [
//   ["Country", "Customer Count"],
//   ["Germany", 200],
//   ["United States", 300],
//   ["Brazil", 400],
//   ["Canada", 500],
//   ["France", 600],
//   ["RU", 700],
// ];

export default function GeoChart({ geoData }) {
  const data = geoData.map((item) => [item._id, item.count]);

  data.unshift(["Country", "Customer Count"]);

  console.log(data);

  return (
    <Chart
      chartEvents={[
        {
          eventName: "select",
          callback: ({ chartWrapper }) => {
            const chart = chartWrapper.getChart();
            const selection = chart.getSelection();
            if (selection.length === 0) return;
            const region = data[selection[0].row + 1];
            console.log("Selected : " + region);
          },
        },
      ]}
      chartType="GeoChart"
      width="100%"
      height="400px"
      data={data}
    />
  );
}
