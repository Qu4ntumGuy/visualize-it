import axios from "axios";
import TotalSales from "./Components/TotalSales";
import { useEffect, useState } from "react";
import Dropdown from "./Components/Dropdown";

function App() {
  const [data, setData] = useState([]);
  // const [dataType, setDataType] = useState("monthly");
  const [inputType, setInputType] = useState("monthlyTotalSales");

  const handleSelect = (option) => {
    setInputType(option);
  };

  const fetchGrowthRateData = async () => {
    axios
      .get("http://localhost:8000/api/growthRate")
      .then((response) => {
        const data = response.data;
        const labels = data.map(
          (item) => `${item._id.year}-${item._id.month || item._id.quarter}`
        );
        const growthRates = data.map((item) => item.growthRate);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Sales Growth Rate",
              data: growthRates,
              fill: false,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              tension: 0.1,
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const fetchSalesData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/${inputType}`
      );
      // console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, [inputType]);

  return (
    <div className="h-screen overflow-hidden">
      <div className="h-screen overflow-y-auto p-2 max-w-7xl mx-auto">
        <div>
          <div className=" text-2xl font-semibold">Total Sales</div>
          <div className=" w-1/4 my-5">
            <Dropdown
              options={[
                { value: "monthlyTotalSales", label: "Monthly" },
                { value: "dailyTotalSales", label: "Daily" },
                { value: "quarterlyTotalSales", label: "Quarterly" },
                { value: "yearlyTotalSales", label: "Yearly" },
              ]}
              onSelect={handleSelect}
            />
          </div>
          <TotalSales dataType={inputType} fetchedData={data} />
        </div>
      </div>
    </div>
  );
}

export default App;
