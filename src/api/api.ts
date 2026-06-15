import type { Product, ProductsResponse } from '../types';

const BASE = 'https://dummyjson.com';

async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

interface CategoryRaw {
  slug: string;
  name: string;
  url: string;
}

export async function getCategories(): Promise<string[]> {
  const data = await fetchData<CategoryRaw[]>(`${BASE}/products/categories`);
  return data.map((c) => c.slug);
}

export async function getProducts(limit = 0, skip = 0): Promise<ProductsResponse> {
  return fetchData<ProductsResponse>(`${BASE}/products?limit=${limit}&skip=${skip}`);
}

export async function getSingleProduct(id: string | number): Promise<Product> {
  return fetchData<Product>(`${BASE}/products/${id}`);
}

export async function getByCategory(category: string, limit = 0): Promise<Product[]> {
  const data = await fetchData<ProductsResponse>(
    `${BASE}/products/category/${category}?limit=${limit}`
  );
  return data.products;
}

export async function searchProducts(query = ''): Promise<Product[]> {
  const data = await fetchData<ProductsResponse>(
    `${BASE}/products/search?q=${encodeURIComponent(query)}`
  );
  return data.products;
}
