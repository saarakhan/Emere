import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { UserProvider } from "./context/userContext.jsx";
import { HelmetProvider } from "react-helmet-async";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <HelmetProvider>
      <UserProvider>
        <CartProvider>
          <ScrollToTop />
          <App />
        </CartProvider>
      </UserProvider>
    </HelmetProvider>
  </BrowserRouter>
);
