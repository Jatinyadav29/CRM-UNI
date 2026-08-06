import { api } from "../../../config/api";

export const getAllProductsApi = async (search) => {
  let url = search ? `/products/search?q=${search}` : "/products?limit=100";

  try {
    let res = await api.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsCategories = async () => {
  try {
    let res = await api.get("/products/categories");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsByCategory = async (cat) => {
  try {
    let res = await api.get(`/products/category/${cat}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
