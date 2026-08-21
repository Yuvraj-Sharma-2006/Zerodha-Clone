import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionsWindow.css";
import { ToastContainer, toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const SellActionWindow = ({ uid, price }) => {
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
        `${API_URL}/newOrder`,
        {
          name: uid,
          quantity: stockQuantity,
          price: stockPrice,
          mode: "SELL",
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
      generalContext.closeSellWindow();
    }, 6000);
  };

  let handleCancelClick = () => {
    generalContext.closeSellWindow();
  };

  let handlePrice = (e) => {
    setStockQuantity(e.target.value);
    setStockPrice(e.target.value * price);
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
              onChange={(e) => handlePrice(e)}
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
              onChange={(e) => setStockPrice(price)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <Link className="btn btn-danger" onClick={handleBuyClick}>
            Sell
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

export default SellActionWindow;
