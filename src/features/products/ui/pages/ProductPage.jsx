import React from "react";
import {
  useAllProduct,
  useProductsByCategory,
} from "../../hook/useProductHooks";
import ProductCard from "../components/ProductCard";
import ProductFilterBar from "../components/ProductFilterBar";

const ProductPage = () => {
  let { data, isPending, errors, search, setSearch } = useAllProduct();
  let {
    data: productsByCategory,
    category,
    setCategory,
  } = useProductsByCategory();

  if (isPending)
    return (
      <div className="felx justify-center items-center text-blue-700">
        Loading products ....
      </div>
    );
  return (
    <div className="min-h-screen">
      <ProductFilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-16 gap-10 p-16">
        {productsByCategory?.products.length
          ? productsByCategory?.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          : data?.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
};

export default ProductPage;
