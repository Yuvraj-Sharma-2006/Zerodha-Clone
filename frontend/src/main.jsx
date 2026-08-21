import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import Navbar from "./landing_page/Navbar";
import Footer from "./landing_page/Footer";
import PageNotFound from "./landing_page/PageNotFound";
import HomePage from "./landing_page/home/HomePage";
import About from "./landing_page/about/AboutPage";
import Pricing from "./landing_page/pricing/PricingPage";
import Products from "./landing_page/products/ProductSection";
import Signup from "./landing_page/signup/Signup";
import Support from "./landing_page/support/SupportPage";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CookiesProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/products" element={<Products />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/support" element={<Support />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </CookiesProvider>
  </BrowserRouter>,
);
