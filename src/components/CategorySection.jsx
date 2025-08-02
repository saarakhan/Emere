import CategoryProduct from "./CategoryProduct";
import ProductCard from "./ProductCard";

const CategorySection = ({ category, limit }) => {
  return (
    <div className="p-2">
      <CategoryProduct category={category} limit={limit}>
        {({ loading, categoryProduct }) =>
          loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {categoryProduct.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )
        }
      </CategoryProduct>
    </div>
  );
};

export default CategorySection;
