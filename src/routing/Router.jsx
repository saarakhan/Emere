import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Cart from "../components/Cart";
import AllProducts from "../components/AllProducts";
import ProductDetail from "../components/ProductDetail";
import Checkout from "../components/Checkout";
import PaymentPage from "../components/PaymentPage";
import Pay from "../components/Pay";
import Signup from "../components/Signup";
import Login from "../components/Login";
import UserPage from "../components/UserPage";
import ProtectedRoute from "../components/ProtectedRoute";
import { useUser } from "../context/userContext";

const Router = () => {
  const { loading } = useUser();
  if (loading) return <div>Loading...</div>;
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product" element={<AllProducts />} />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout/payment"
        element={
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pay"
        element={
          <ProtectedRoute>
            <Pay />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
  );
};

export default Router;
