import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import BreadCrumb from "./BreadCrumb";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    setPrice(total);
  }, [cart]);

  const handleAdd = item => {
    console.log(item);
    const product = { id: item.id, title: item.title, price: item.price, description: item.description, image: item.image };
    addToCart(product);
  };
  const handleRemove = id => {
    removeFromCart(id);
  };

  const navigate = useNavigate();

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="m-2 p-2">
        <BreadCrumb />
      </div>
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map(item => (
              <div key={item.id} className="flex items-start gap-4 bg-white p-4 rounded shadow">
                <img src={item.image} alt={item.title} className="w-24 h-24 object-contain  rounded" />
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{item.title}</h2>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                  {/* <span className="text-sm text-gray-600">Qty : {item.quantity}</span> */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="px-3 py-1 text-lg rounded-full bg-gray-300 hover:bg-gray-400 transition cursor-pointer"
                      disabled={item.quantity <= 1}
                      title="Decrease Quantity">
                      −
                    </button>

                    <span className="text-md font-medium px-2">{item.quantity}</span>

                    <button onClick={() => handleAdd(item)} className="px-3 py-1 text-lg rounded-full bg-gray-300 hover:bg-gray-400 transition cursor-pointer" title="Increase Quantity">
                      +
                    </button>
                  </div>

                  <p className="text-lg font-medium text-green-700 mt-2">₹ {item.price}</p>
                  <p className="text-sm mt-1">
                    Total = {item.quantity} × {item.price} = <span className="font-semibold text-green-700">₹ {item.quantity * item.price}</span>
                  </p>

                  <button onClick={() => removeFromCart(item.id)} className="mt-2 text-red-600 hover:text-red-800 hover:underline text-sm cursor-pointer">
                    Remove Item
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="bg-white p-6 rounded shadow h-fit">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="flex justify-between border-b pb-2 mb-2">
              <span>Items:</span>
              <span>{cart.length}</span>
            </div>
            <div className="flex justify-between border-b pb-2 mb-2">
              <span>Total Price:</span>
              <span className="font-semibold text-green-700">₹ {price.toFixed(2)}</span>
            </div>
            <button onClick={clearCart} className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer">
              Clear Cart
            </button>
            <button className="mt-2 w-full bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400 cursor-pointer" onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
