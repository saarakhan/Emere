import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ id, title, price, description, image, rating }) => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart } = useCart();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  const handleAdd = () => {
    const item = { id, title, price, description, image };
    addToCart(item);
  };

  const handleRemove = () => {
    removeFromCart(id);
  };

  const shortTitle = title.length > 50 ? title.slice(0, 50) + "..." : title;
  const itemInCart = cart.find((item) => item.id === id);
  const quantity = itemInCart?.quantity || 0;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col">
      <div
        className="overflow-hidden rounded-lg bg-gray-50 flex justify-center items-center h-56 mb-4 cursor-pointer"
        onClick={handleClick}
      >
        <img
          src={image}
          alt={title}
          className="h-full object-contain transform hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <h2 className="text-base font-semibold mb-1 line-clamp-2">{shortTitle}</h2>
      <p className="text-green-700 font-semibold text-lg mb-1">₹ {price.toFixed(2)}</p>
      <p className="text-sm text-yellow-600 mb-4">
        ⭐ {rating.rate} ({rating.count} reviews)
      </p>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-auto">
        {quantity > 0 ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handleRemove}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={handleAdd}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            className="w-full sm:w-auto bg-button text-white px-4 py-2 rounded-md hover:bg-white hover:text-button hover:border hover:border-button transition"
          >
            Add to Cart
          </button>
        )}

        <button
          onClick={handleClick}
          className="w-full sm:w-auto bg-button text-white px-4 py-2 rounded-md hover:bg-white hover:text-button hover:border hover:border-button transition"
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
