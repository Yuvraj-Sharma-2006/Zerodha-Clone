import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Summary = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("user");
  const [balance_val, setBalance] = useState(0);
  const [openning_val, setOpenning] = useState(0);
  const [holding, setHolding] = useState({
    size: 0,
    currentValue: 0,
    investment: 0,
  });

  const [cookies, , removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
        return;
      }

      const { data } = await axios.post(
        "http://localhost:3002",
        {},
        { withCredentials: true },
      );

      const { status, user, balance, openning } = data;
      setUsername(user);
      setBalance(balance);
      setOpenning(openning);

      axios
        .get("http://localhost:3002/allHoldings", {
          withCredentials: true,
        })
        .then((res) => {
          const holdings = res.data;
          const size = holdings.length;
          let currentValue = 0,
            investment = 0;

          holdings.forEach((item) => {
            ((currentValue += item.price * item.qty),
              (investment += item.avg * item.qty));
          });
          setHolding({ size, currentValue, investment });
        })
        .catch((err) => console.log(err));

      return status
        ? toast(`Hello ${user}`, { position: "top-right" })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, removeCookie, navigate]);

  return (
    <>
      <div className="username">
        <h6>Hi, {username}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{balance_val.toFixed(2)}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used{" "}
              <span>{(openning_val - balance_val).toFixed(2)}</span>{" "}
            </p>
            <p>
              Opening balance <span>{openning_val.toFixed(2)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holding.size})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className="profit">
              {(holding.currentValue - holding.investment).toFixed(2)}{" "}
              <small>
                {(
                  (holding.currentValue - holding.investment) /
                  (holding.investment / 100)
                ).toFixed(2)}
                %
              </small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{holding.currentValue.toFixed(2)}</span>{" "}
            </p>
            <p>
              Investment <span>{holding.investment.toFixed(2)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
      <ToastContainer />
    </>
  );
};

export default Summary;
