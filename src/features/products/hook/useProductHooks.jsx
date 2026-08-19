import { useQuery } from "@tanstack/react-query";
import {
  getAllProductsApi,
  getProductsByCategory,
  getProductsCategories,
} from "../api/productApi";
import { useEffect, useState } from "react";

export const useAllProduct = () => {
  const [search, setSearch] = useState(null);
  const [debounceSearch, setDebounceSearch] = useState(null);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setDebounceSearch(search);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [search]);

  let { data, isPending, errors } = useQuery({
    queryKey: ["products", debounceSearch],
    queryFn: () => getAllProductsApi(debounceSearch),
  });

  return { data, isPending, errors, search, setSearch };
};

export const useAllCategories = () => {
  return useQuery({
    queryKey: ["AllCategories"],
    queryFn: getProductsCategories,
  });
};

export const useProductsByCategory = () => {
  const [category, setCategory] = useState(null);

  let { data } = useQuery({
    queryKey: ["productsByCategory", category],
    queryFn: () => getProductsByCategory(category),
  });

  return { data, category, setCategory };
};
