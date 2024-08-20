import axios from "axios";
import TotalSales from "./Components/TotalSales";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [dataType, setDataType] = useState("monthly");

  const fetchSalesData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/monthlyTotalSales"
      );
      // console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  return (
    <div className="h-screen overflow-hidden">
      <div className="h-screen overflow-y-auto p-2 max-w-7xl mx-auto">
        <div className=" text-2xl font-semibold ml-5">Total Sales</div>
        <TotalSales dataType={dataType} fetchedData={data} />
        <div></div>
      </div>
    </div>
  );
}

export default App;
