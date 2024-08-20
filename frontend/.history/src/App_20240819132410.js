import TotalSales from "./Components/TotalSales";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [dataType, setDataType] = useState("monthly");

  const fetchSalesData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/monthlyTotalSales"
      );
      setData(response.data);
      console.log(data);
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
