const categoriesAPI = "https://dummyjson.com/products/categories";
const productsAPI = "https://dummyjson.com/products";
const getByCategoryApi = "https://dummyjson.com/products/category/";
const searchProductsAPI = "https://dummyjson.com/products/search?q=";
const getSingleProductAPI = "https://dummyjson.com/products/";

async function fetchData(api) {
  return await fetch(api).then((res) => res.json());
}

export async function getCategories(setData) {
  await fetchData(categoriesAPI).then(setData);
}

export async function getProducts(getData, limit = 0, skip = 0) {
  const productsLimitAPI = `${productsAPI}?limit=${limit}&skip=${skip}`;
  await fetchData(productsLimitAPI).then(getData);
}

export async function getSingleProduct(getData, id ) {
  const productAPI = `${getSingleProductAPI}${id}`;
  await fetchData(productAPI).then(getData);
}

export async function getByCategory(category, setData, limit = 0) {
  const productsAPI = getByCategoryApi + category + `?limit=${limit}`;
  await fetchData(productsAPI)
    .then((data) => data.products)
    .then(setData);
}

export async function getSearchProducts(getData, query = "") {
  const searchProducts = `${searchProductsAPI}${query}`;
  await fetchData(searchProducts).then((data) => data.products).then(getData);
}
