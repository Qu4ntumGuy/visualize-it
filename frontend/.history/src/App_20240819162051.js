import axios from "axios";
import TotalSales from "./Components/TotalSales";
import { useEffect, useState } from "react";
import Dropdown from "./Components/Dropdown";
import GrowthRate from "./Components/GrowthRate";

function App() {
  const [data, setData] = useState([]);
  // const [dataType, setDataType] = useState("monthly");
  const [chartData, setChartData] = useState([]);
  const [inputType, setInputType] = useState("monthlyTotalSales");

  const handleSelect = (option) => {
    setInputType(option);
  };

  const fetchGrowthRateData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/growthRate");
      // console.log(response.data.data);
      setChartData(response.data.data);
    } catch (error) {
      console.error(error);
    }
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
    fetchGrowthRateData();
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
        <div>
          <GrowthRate fetchedData={chartData} />
        </div>
      </div>
    </div>
  );
}

export default App;
