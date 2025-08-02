import React from "react";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const { cart, isDrawerOpen, setIsDrawerOpen, clearCart } = useCart();
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setPrice(total);
  }, [cart]);

  return (
    <>
      {isDrawerOpen && <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setIsDrawerOpen(false)} aria-label="Close cart drawer" />}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm sm:w-[400px] bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out flex flex-col ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title">
        <header className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h2 id="cart-title" className="text-2xl font-semibold text-gray-900">
            Your Cart
          </h2>
          <button onClick={() => setIsDrawerOpen(false)} className="text-3xl font-bold cursor-pointer text-gray-700 hover:text-gray-900" aria-label="Close cart">
            &times;
          </button>
        </header>

        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-gray-500 space-y-3 mt-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 9m5-9v9m4-9v9m2-18v6" />
              </svg>
              <p className="text-lg">Your cart is empty.</p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="flex items-center gap-4 border-b pb-3 last:border-b-0">
                {item.image && <img src={item.image} loading="lazy" alt={item.title} className="w-16 h-16 object-cover rounded" />}
                <div className="flex flex-col flex-grow">
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <span>Qty: {item.quantity}</span>
                    <span>|</span>
                    <span>₹ {item.price.toFixed(2)}</span>
                  </div>
                </div>
                <div className="font-medium text-gray-900">₹ {(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <footer className="p-4 border-t bg-white sticky bottom-0 flex flex-col gap-4">
            <div className="flex justify-between items-center text-lg font-semibold text-gray-900">
              <span>Total:</span>
              <span>₹ {price.toFixed(2)}</span>
            </div>

            <button onClick={clearCart} className="w-full py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition-colors cursor-pointer">
              Clear Cart
            </button>

            <button
              onClick={() => {
                setIsDrawerOpen(false);
                navigate("/cart");
              }}
              className="w-full py-2 bg-gray-900 text-white font-semibold rounded hover:bg-gray-800 transition-colors cursor-pointer">
              View Cart in Detail
            </button>
          </footer>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
