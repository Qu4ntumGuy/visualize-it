import axios from "axios";
import TotalSales from "./Components/TotalSales";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [dataType, setDataType] = useState("monthly");

  const fetchSalesData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/quarterlyTotalSales"
      );
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  return (
    <div className="App">
      {/* <TotalSales dataType={dataType} fetchedData={data} /> */}
    </div>
  );
}

export default App;
