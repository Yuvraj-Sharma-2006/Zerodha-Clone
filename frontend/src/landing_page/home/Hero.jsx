import "./Hero.css";
import { useNavigate } from "react-router-dom";
function Hero() {
  const navigate = useNavigate();
  return (
    <div className="HomeHero container-fluid mb-3">
      <div className="row p-3">
        <img
          src="media/images/homeHero.png"
          alt="Home Hero images"
          className="img-fluid offset-lg-2 col-lg-8 mb-2"
        />

        <div className="text-center mt-5">
          <h2>Invest in everything</h2>
          <p className="text-muted mt-3 fs-5">
            Online platform to invest in stocks, derivatives, mutual funds,
            ETFs, bonds, and more.
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

export default Hero;
