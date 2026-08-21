import axios from "axios";
import { useState, useEffect } from "react";
import VerticalGraph from "./VerticalGraph";
const API_URL = import.meta.env.VITE_API_URL;

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const totalInvestment = allHoldings.reduce(
    (acc, stock) => acc + stock.avg * stock.qty,
    0,
  );
  const totalCurrentValue = allHoldings.reduce(
    (acc, stock) => acc + stock.price * stock.qty,
    0,
  );
  const totalProfitLoss = totalCurrentValue - totalInvestment;

  useEffect(() => {
    axios
      .get(`${API_URL}/allHoldings`, { withCredentials: true })
      .then((res) => {
        setAllHoldings(res.data);
      });
  }, []);

  const labels = allHoldings.map((stock) => stock["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock["price"]),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Stock quantity",
        data: allHoldings.map((stock) => stock["qty"]),
        backgroundColor: "rgba(166, 25, 242, 0.5)",
      },
      {
        label: "Total Profit",
        data: allHoldings.map((stock) => stock["qty"] * stock["price"]),
        backgroundColor: "rgba(243, 239, 25, 0.5)",
      },
    ],
  };
  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table table-responsive">
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>

          <tbody>
            {allHoldings.map((stock, index) => {
              let currVal = stock.price * stock.qty;
              let isProfit = currVal - stock.avg * stock.qty > 0.0;
              let profitClass = isProfit ? "profit" : "loss";
              let dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{currVal.toFixed(2)}</td>
                  <td className={profitClass}>
                    {(currVal - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            {totalInvestment.toFixed(2)}
            <span>{allHoldings.length}</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            {totalCurrentValue.toFixed(2)}
            <span>{allHoldings.length}</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>{totalProfitLoss.toFixed(2)}</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
