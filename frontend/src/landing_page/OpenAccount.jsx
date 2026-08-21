import { useNavigate } from "react-router-dom";
function OpenAccount() {
  const navigate = useNavigate();
  return (
    <div className="container mt-3 p-5  mb-3 text-center">
      <div className="row">
        <div className="col-12">
          <h1 className="fs-3">Open a Zerodha account</h1>
          <p className="text-muted mt-4 fs-5">
            Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
            F&O trades.
          </p>
          <button
            className="button border border-0 m-4 text-white  border-none"
            onClick={() => navigate("/signup")}
          >
            Sign up for free
          </button>
        </div>
      </div>
    </div>
  );
}

export default OpenAccount;
