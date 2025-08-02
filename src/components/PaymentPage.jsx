import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import BreadCrumb from "./BreadCrumb";
import { useNavigate } from "react-router-dom";
const PaymentPage = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [price, setPrice] = useState(0);
  const [name, setName] = useState("");

  // Calculate total price
  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setPrice(total);
  }, [cart]);

  // Load user name
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setName(parsedData.firstName || "");
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="m-2 p-2">
        <BreadCrumb />
      </div>
      <h1 className="text-2xl font-semibold mb-4">Hey{name ? `, ${name}` : ""} 👋</h1>

      <div className="space-y-4 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-medium mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div key={item.id} className="flex items-center justify-between border-b pb-3 last:border-none">
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.title} className="h-16 w-16 object-cover rounded" />
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="text-right font-semibold text-gray-800">₹{item.price * item.quantity}</p>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 flex justify-between items-center bg-gray-50 p-4 rounded-md border">
        <span className="text-lg font-medium">Total to Pay:</span>
        <span className="text-xl font-bold text-green-600">₹{price}</span>
      </div>

      <div className="mt-6 text-center">
        <button
          className="w-full md:w-auto bg-purple-600 text-white py-2 px-6 rounded-md hover:bg-purple-700 transition cursor-pointer"
          onClick={() => {
            navigate("/pay");
          }}>
          Pay with PhonePe
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
