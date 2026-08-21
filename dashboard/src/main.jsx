import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import "./index.css";
import Home from "./components/Home";
import Welcome from "./components/WelCome";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CookiesProvider>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </CookiesProvider>
  </BrowserRouter>,
);
