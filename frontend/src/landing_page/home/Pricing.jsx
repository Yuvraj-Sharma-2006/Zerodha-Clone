import "./pricing.css";
function Pricing() {
  return (
    <div className="container-fluid mb-5">
      <div className="row p-3">
        <div className="offset-xl-1 col-xl-4 col-md-4">
          <h1 className="fs-2 mb-4">Unbeatable pricing</h1>
          <p>
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>
        </div>

        <div className="col-xl-7 col-md-7">
          <div className="row mt-4">
            <div className="pricing-box col-lg-4 col-md-6 col-sm-4 d-flex align-items-center">
              <img
                src="media/images/pricing0.svg"
                alt="0 pricing"
                className="pricing-img"
              />
              <p className="mt-3 pricing-info">Free account opening</p>
            </div>

            <div className="pricing-box col-lg-4  col-md-6 col-sm-4 d-flex align-items-center">
              <img
                src="media/images/pricing0.svg"
                alt="0 pricing"
                className="pricing-img"
              />
              <p className="mt-3 pricing-info">
                Free equity delivery and direct mutual funds
              </p>
            </div>

            <div className="pricing-box col-lg-4 col-md-6 col-sm-4 d-flex align-items-center">
              <img
                src="media/images/intradayTrades.svg"
                alt="20 pricing"
                className="pricing-img"
              />
              <p className="mt-3 pricing-info">Intraday and F&O</p>
            </div>
          </div>
        </div>

        <div className="offset-xl-1 col-xl-11 col-md-12 mb-5">
          <a href="#" className="link link-hover">
            See Pricing<i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
