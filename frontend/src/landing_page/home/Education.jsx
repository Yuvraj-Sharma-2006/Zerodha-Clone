import "./Education.css";
function Education() {
  return (
    <div className="Education-box container-fluid mb-5">
      <div className="row">
        <div className="offset-xl-1 col-xl-5 col-md-6 mt-3 text-center">
          <img
            src="media/images/education.svg"
            alt="varsity"
            className="img-fluid"
          />
        </div>

        <div className="col-xl-5 col-md-6 mt-3">
          <h1 className="fs-2 text-muted">Free and open market education</h1>
          <p className="mt-4 text-muted">
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>
          <a href="#" className="link link-hover mb-2">
            Varsity <i className="fa-solid fa-arrow-right"></i>
          </a>

          <p className="mt-4 text-muted">
            TradingQ&A, the most active trading and investment community in
            India for all your market related queries.
          </p>
          <a href="#" className="link link-hover">
            TradingQ&A <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Education;
