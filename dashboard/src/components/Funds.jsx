import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Funds.css";
import { ToastContainer, toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const Funds = () => {
  const [amount, setAmount] = useState(0);
  const [openingBal, setOpeningBal] = useState(0);
  const [availBal, setAvailBal] = useState(0);
  const [openAdd, setAdd] = useState(false);
  const [openWithDraw, setOpenWithDraw] = useState(false);

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const getBalance = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/balance`, {
        withCredentials: true,
      });
      const update = () => {
        setOpeningBal(data.openning_Bal);
        setAvailBal(data.availble_Bal);
      };
      update();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  const handleAddBalance = () => {
    async function addBalance() {
      try {
        const { data } = await axios.post(
          `${API_URL}/user`,
          {
            amount: amount,
            mode: "add",
          },
          {
            withCredentials: true,
          },
        );

        const { success, message } = data;
        if (success) {
          handleSuccess(message);
        } else {
          handleError(message);
        }

        setTimeout(() => {
          setAdd(false);
          setAmount(0);
          getBalance();
        }, 6000);
      } catch (err) {
        console.log(err);
      }
    }
    addBalance();
  };

  const handleWithDraw = () => {
    async function withDraw() {
      try {
        const { data } = await axios.post(
        `${API_URL}/user`,
          {
            amount: amount,
            mode: "withDraw",
          },
          {
            withCredentials: true,
          },
        );

        const { success, message } = data;
        if (success) {
          handleSuccess(message);
        } else {
          handleError(message);
        }

        setTimeout(() => {
          setAmount(0);
          setOpenWithDraw(false);
          getBalance();
        }, 6000);
      } catch (err) {
        console.log(err);
      }
    }
    withDraw();
  };

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI </p>
        <button
          className="button btn btn-green"
          onClick={() => {
            (setAdd(true), setOpenWithDraw(false));
          }}
        >
          Add funds
        </button>
        <button
          className="button btn"
          onClick={() => {
            (setOpenWithDraw(true), setAdd(false));
          }}
        >
          Withdraw
        </button>
      </div>

      {openAdd ? (
        <div className="addForm inputs">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Add Balance to your account </h5>
              <fieldset class="card-text mb-3">
                <legend>
                  {" "}
                  <b> ammount </b>
                </legend>
                <input
                  type="number"
                  min="0"
                  name="amount"
                  id="amount"
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                />
              </fieldset>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddBalance}
              >
                {" "}
                Add{" "}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setAdd(false)}
              >
                {" "}
                Cancel{" "}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      {openWithDraw ? (
        <div className="withDrawForm inputs">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">With draw payment from your account </h5>
              <fieldset class="card-text mb-3">
                <legend>
                  <b> ammount </b>
                </legend>
                <input
                  type="number"
                  min="0"
                  name="amount"
                  id="amount"
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                />
              </fieldset>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleWithDraw}
              >
                {" "}
                withDraw{" "}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setOpenWithDraw(false)}
              >
                {" "}
                Cancel{" "}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">{availBal.toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">{(openingBal - availBal).toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">{availBal.toFixed(2)}</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>{openingBal}</p>
            </div>
            <div className="data">
              <p>Opening Balance</p>
              <p>{openingBal}</p>
            </div>
            <div className="data">
              <p>Payin</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>SPAN</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Delivery margin</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Options premium</p>
              <p>0.00</p>
            </div>
            <hr />
            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Collateral (Equity)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Total Collateral</p>
              <p>0.00</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <Link className="button btn btn-blue">Open Account</Link>
          </div>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default Funds;
