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
      <div className="p-2 h-96 w-full">
        <TotalSales dataType={dataType} fetchedData={data} />
      </div>
    </div>
  );
}

export default App;
