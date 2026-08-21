import { useNavigate } from "react-router-dom";
import "./Welcome.css";
export default function Welcome() {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/Home");
  }, 3000);
  return (
    <div className="welcome">
      <img src="/logo.png" className="main-logo" />
      <p className="authore"> Create by : Yuvraj Sharma</p>
    </div>
  );
}
