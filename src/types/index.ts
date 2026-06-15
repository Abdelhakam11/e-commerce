export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  thumbnail: string;
  rating: number;
  stock: number;
  brand?: string;
  tags?: string[];
  discountPercentage?: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

export interface FavouriteItem {
  id: number;
  title: string;
  price: number;
  image: string;
}
