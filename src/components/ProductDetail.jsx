import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "./BreadCrumb";
import { useCart } from "../context/CartContext";
import { Helmet } from "react-helmet-async";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchDetailedProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDetailedProduct();
  }, [id]);

  const handleAdd = () => {
    const item = {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
    };
    addToCart(item);
    console.log("item added to cart");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {product && (
        <Helmet>
          <title>{product.title} | My E-Commerce</title>
          <meta name="description" content={product.description.slice(0, 150)} />
          <meta property="og:title" content={product.title} />
          <meta property="og:description" content={product.description.slice(0, 150)} />
          <meta property="og:image" content={product.image} />
          <meta property="og:type" content="product" />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              name: product.title,
              image: [product.image],
              description: product.description,
              brand: { "@type": "Brand", name: "Generic Brand" },
              offers: {
                "@type": "Offer",
                priceCurrency: "INR",
                price: product.price,
                availability: "https://schema.org/InStock",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: product.rating.rate,
                reviewCount: product.rating.count,
              },
            })}
          </script>
        </Helmet>
      )}

      <div className="mb-4">
        <BreadCrumb />
      </div>

      {product ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow-md p-4 sm:p-6">
          {/* Product Image */}
          <div className="flex justify-center items-start">
            <img
              src={product.image}
              alt={product.title}
              className="w-full max-w-xs sm:max-w-sm object-contain h-[300px] sm:h-[400px] rounded-lg border p-4 bg-gray-50"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-900">{product.title}</h1>
              <p className="text-sm text-gray-500 mb-3">Category: {product.category}</p>
              <div className="flex flex-wrap items-center mb-4">
                <p className="text-lg sm:text-xl font-bold text-green-700 mr-3">₹ {product.price.toFixed(2)}</p>
                <span className="text-yellow-600 text-sm">
                  ⭐ {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{product.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button
                className="bg-yellow-400 hover:bg-yellow-500 transition-colors px-6 py-3 rounded-md text-sm font-medium shadow cursor-pointer w-full sm:w-auto"
                onClick={handleAdd}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">Loading product...</p>
      )}
    </div>
  );
};

export default ProductDetail;
