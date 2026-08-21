import "./stats.css";
function Stats() {
  return (
    <div className="container-fluid mt-5">
      <div className="row p-3">
        <div className="offset-xl-1 col-xl-4 col-md-5 mb-5">
          <h1 className="fs-2">Trust with confidence</h1>

          <div className="mt-5">
            <h2 className="fs-3">Customer-first always</h2>
            <p className="text-muted">
              That's why 1.6+ crore customers trust Zerodha with ~ ₹6 lakh
              crores of equity investments, making us India’s largest broker;
              contributing to 15% of daily retail exchange volumes in India.
            </p>
          </div>

          <div className="mt-5">
            <h2 className="fs-3">No spam or gimmicks</h2>
            <p className="text-muted">
              No gimmicks, spam, "gamification", or annoying push notifications.
              High quality apps that you use at your pace, the way you like.
              <a className="link" href="#">
                {" "}
                Our Philosophies{" "}
              </a>
              .
            </p>
          </div>

          <div className="mt-5">
            <h2 className="fs-3">The Zerodha universe</h2>
            <p className="text-muted">
              Not just an app, but a whole ecosystem. Our investments in 30+
              fintech startups offer you tailored services specific to your
              needs.
            </p>
          </div>

          <div className="mt-5">
            <h2 className="fs-3">Do better with money</h2>
            <p className="text-muted">
              With initiatives like{" "}
              <a className="link" href="#">
                Nudge
              </a>{" "}
              and{" "}
              <a className="link" href="#">
                Kill Switch
              </a>
              , we don't just facilitate transactions , but actively help you do
              better with your money..
            </p>
          </div>
        </div>

        <div className="col-xl-6 col-lg-7 col-md-7  d-flex flex-column justify-content-center">
          <img
            src="media/images/ecosystem.png"
            alt="ecosystem"
            className="img img-fluid"
          />
          <div className="col-12 text-center mt-2">
            <a href="#" className="link link-hover mx-2">
              Explore our products<i className="fa-solid fa-arrow-right"></i>
            </a>
            <a href="#" className="link link-hover mx-2">
              Try Kite demo<i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
