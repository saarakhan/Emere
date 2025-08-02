import { useEffect, useState } from "react";
// import product from "../data/Product.js";
import ProductCard from "./ProductCard.jsx";
import BreadCrumb from "./BreadCrumb.jsx";

const AllProducts = () => {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // fetching data from fakestoreapi
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProducts();
  }, []);
  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="">
      <div className="m-2 p-2">
        <BreadCrumb />
      </div>
      <h1 className="text-[40px] text-center m-2 p-2">All Products</h1>
      {product.length === 0 ? (
        <div>No Product</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 ">
          {product.map(item => (
            <ProductCard key={item.id} id={item.id} title={item.title} description={item.description} price={item.price} category={item.category} image={item.image} rating={item.rating} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
