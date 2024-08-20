import logo from "./logo.svg";
import "./App.css";
import TotalSales from "../Components/TotalSales";
import { useState } from "react";

function App() {
  const [data, setData] = useState([]);

  const fetchSalesData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/monthlyTotalSales"
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <TotalSales />
    </div>
  );
}

export default App;
