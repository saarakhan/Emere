import "./App.css";
import Router from "./routing/Router";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import { useEffect } from "react";
import { Toaster } from "sonner";
import Footer from "./components/Footer";
const App = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div>
      <Toaster position="top-center" richColors />
      <Navbar />
      <Router />
      <CartDrawer />
      <Footer />
    </div>
  );
};

export default App;
