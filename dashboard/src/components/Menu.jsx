import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import "../index.css";
const API_URL = import.meta.env.VITE_API_URL;

const Menu = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [cookies, , removeCookie] = useCookies(["token"]);
  const [isLogin, setIsLogin] = useState(!!cookies.token);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = (state) => {
    setIsProfileOpen(!state);
  };

  useEffect(() => {
    const checkCookie = async () => {
      if (!cookies.token) {
        handleMenuClick(6);
        setIsLogin(false);
        navigate("/login");
        return;
      }
      const { data } = await axios.post(
        `${API_URL}/`,
        {},
        { withCredentials: true },
      );

      const { status } = data;

      return status
        ? setIsLogin(true)
        : (setIsLogin(false),
          handleMenuClick(6),
          removeCookie("token"),
          navigate("/login"));
    };
    checkCookie();
  }, [cookies.token, cookies, removeCookie, navigate]);

  const logOut = () => {
    handleMenuClick(6);
    setIsLogin(false);
    removeCookie("token");
    navigate("/login");
  };

  const menuClass = "menu";
  const activeMenuClass = "menuSelected";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link onClick={() => handleMenuClick(0)} to="/Home">
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link onClick={() => handleMenuClick(1)} to="/orders">
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link onClick={() => handleMenuClick(2)} to="/holdings">
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link onClick={() => handleMenuClick(3)} to="/positions">
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link onClick={() => handleMenuClick(4)} to="/funds">
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link onClick={() => handleMenuClick(5)} to="/apps">
              <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>

          <li>
            {isLogin ? (
              <button className="btn btn-danger rounded" onClick={logOut}>
                Log Out
              </button>
            ) : (
              <Link onClick={() => handleMenuClick(6)} to="/login">
                <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                  Login
                </p>
              </Link>
            )}
          </li>
        </ul>
        <hr />

        <div className="profile" onClick={handleProfileClick}>
          <i className="fa-regular fa-circle-user fs-2"></i>
        </div>
      </div>
    </div>
  );
};

export default Menu;
