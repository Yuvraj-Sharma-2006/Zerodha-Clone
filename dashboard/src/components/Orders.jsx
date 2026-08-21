import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3002/allOrders", { withCredentials: true })
      .then((res) => {
        setOrders(res.data);
      });
  });

  return (
    <div className="orders">
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>

          <Link to={"/Home"} className="button">
            Get started
          </Link>
        </div>
      ) : (
        <>
          <h3 className="title"> Orders ({orders.length})</h3>

          <div className="order-table table-responsive">
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th>stock</th>
                  <th>qty</th>
                  <th>price</th>
                  <th>Total value</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Mode</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, index) => {
                  const date = new Date(order.date);
                  return (
                    <tr key={index}>
                      <td>{order.name}</td>
                      <td>{order.qty}</td>
                      <td>{order.price.toFixed(2)}</td>
                      <td>{(order.qty * order.price).toFixed(2)}</td>
                      <td>{date.toLocaleDateString("en-GB")}</td>
                      <td>
                        {date.getHours() % 12 == 0 ? 12 : date.getHours() % 12}{" "}
                        :{" "}
                        {date.getMinutes() < 10
                          ? "0" + date.getMinutes()
                          : date.getMinutes()}{" "}
                        :{" "}
                        {date.getSeconds() < 10
                          ? "0" + date.getSeconds()
                          : date.getSeconds()}
                      </td>
                      <td className="fs-5">{order.mode}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
