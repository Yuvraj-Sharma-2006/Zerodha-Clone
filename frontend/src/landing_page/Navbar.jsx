import "./Navbar.css";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import axios from "axios";
function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [cookies, removeCookie] = useCookies([]);

  useEffect(() => {
    console.log("cookies", cookies);
    console.log("token", cookies.token);
    console.log("isLogin", isLogin);
    const checkLogin = async () => {
      if (!cookies.token) {
        setIsLogin(false);
        return;
      }

      const data = await axios.post(
        "http://localhost:3002/",
        {},
        { withCredentials: true },
      );

      const { success } = data;
      console.log("success", success);
      return success
        ? (setIsLogin(true),
          setTimeout(() => {
            window.location.href = "http://localhost:5173/";
          }, 3000))
        : (setIsLogin(false), removeCookie("token"));
    };
    checkLogin();
  }, [cookies, cookies.token, removeCookie, isLogin, setIsLogin]);

  return (
    <nav className="navbar navbar-expand-md bg-white border-bottom sticky-top">
      <div className="container-fluid py-1 px-4">
        <Link className="navbar-brand" to="/">
          <img src="media/images/logo.svg" alt="logo" className="Navbar-logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {!isLogin && (
              <Link className="nav-link" to="/signup">
                Signup
              </Link>
            )}

            <Link className="nav-link" to="/about">
              About
            </Link>

            <Link className="nav-link" aria-current="page" to="/products">
              Products
            </Link>

            <Link className="nav-link" to="/pricing">
              Pricing
            </Link>

            <Link className="nav-link" to="/support">
              Support
            </Link>

            <Link className="nav-link" to="/">
              <i className=" barger-menu fa-solid fa-bars"></i>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
