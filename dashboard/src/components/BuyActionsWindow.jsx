import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionsWindow.css";
import { ToastContainer, toast } from "react-toastify";

const BuyActionWindow = ({ uid, price }) => {
  let navigate = useNavigate();
  let [stockQuantity, setStockQuantity] = useState(1);
  let [stockPrice, setStockPrice] = useState(price);
  const generalContext = useContext(GeneralContext);

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  let handleBuyClick = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3002/newOrder",
        {
          name: uid,
          quantity: stockQuantity,
          price: stockPrice,
          mode: "BUY",
        },
        {
          withCredentials: true,
        },
      );

      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/orders");
        }, 6000);
      } else {
        handleError(message);
      }
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      generalContext.closeBuyWindow();
    }, 6000);
  };

  let handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              min="1"
              onChange={(e) => setStockPrice(price)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <p>Total price {(stockPrice * stockQuantity).toFixed(2)}</p>
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BuyActionWindow;
