import axios from "axios";
import TotalSales from "./Components/TotalSales";
import { useEffect, useState } from "react";
import Dropdown from "./Components/Dropdown";
import GrowthRate from "./Components/GrowthRate";
import NewCustomer from "./Components/NewCustomer";
import GeoDistribute from "./Components/geoDistribute";
import MapChart from "./Components/MapChart";
import GeoChart from "./Components/geoDistribute";

function App() {
  const [data, setData] = useState([]);
  // const [dataType, setDataType] = useState("monthly");
  const [chartData, setChartData] = useState([]);
  const [newCustomer, setNewCustomer] = useState([]);
  const [inputType, setInputType] = useState("monthlyTotalSales");
  const [range, setRange] = useState("3years");
  const [geoData, setGeoData] = useState([]);

  const handleSelect = (option) => {
    setInputType(option);
  };

  const handleLast = (option) => {
    setRange(option);
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

  const fetchNewCustomerData = async () => {
    try {
      const body = {
        range: range,
      };
      const response = await axios.post(
        `http://localhost:8000/api/newCustomer`,
        body
      );
      // console.log(response.data.data);
      setNewCustomer(response.data.data);
    } catch (error) {}
  };

  const fetchGeoDistribution = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/geoDistribute"
      );
      // console.log(response.data.data);
      setGeoData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGeoMaps = async () => {
    try {
      const response = await axios.get(
        "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
      );
      console.log(response);
      // setGeoData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSalesData();
    fetchGrowthRateData();
    fetchNewCustomerData();
    fetchGeoDistribution();
    fetchGeoMaps();
  }, [inputType, range]);

  return (
    <div className="h-screen overflow-hidden">
      <div className="h-screen overflow-y-auto p-2 max-w-7xl mx-auto scrollbar-hide">
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
        <div className="my-10">
          <div className="text-2xl font-semibold mb-5">Sales Growth Rate</div>
          <GrowthRate fetchedData={chartData} />
        </div>
        <div className="my-10">
          <div className="text-2xl font-semibold mb-5">New Customer Added</div>
          <div className=" w-1/4 my-5">
            <Dropdown
              options={[
                { value: "3years", label: "Last 3 Years" },
                { value: "7days", label: "Last 7 Days" },
                { value: "1month", label: "Last 1 Month" },
                { value: "6months", label: "Last 6 Months" },
                { value: "1year", label: "Last 1 Year" },
                { value: "2years", label: "Last 2 Years" },
                { value: "4years", label: "Last 4 Years" },
                { value: "5years", label: "Last 5 Years" },
              ]}
              onSelect={handleLast}
            />
          </div>
          <NewCustomer fetchedData={newCustomer} />
        </div>
        <div className="my-10">
          <div className="text-2xl font-semibold mb-5">
            Geographical Distribution
          </div>
          {/* <GeoDistribute fetchedData={geoData} /> */}
          {/* <MapChart data={geoData} />
          <GeoChart geoData={geoData} /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
