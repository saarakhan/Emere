import React, { useEffect, useState } from "react";

const CategoryProduct = ({ category, limit = 3, children }) => {
  const [loading, setLoading] = useState(false);
  const [categoryProduct, setCategoryProduct] = useState([]);
  useEffect(() => {
    const getProductFromCategory = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const data = await res.json();
        setCategoryProduct(data.slice(0, limit));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProductFromCategory();
  }, [category, limit]);
  return children({ loading, categoryProduct });
};

export default CategoryProduct;
