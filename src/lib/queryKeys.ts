export const queryKeys = {
  categories: ['categories'] as const,
  products: (limit: number, skip: number) => ['products', { limit, skip }] as const,
  infiniteProducts: ['products', 'infinite'] as const,
  product: (id: string | number) => ['product', id] as const,
  productsByCategory: (category: string, limit?: number) =>
    ['products', 'category', category, { limit }] as const,
  productSearch: (query: string) => ['products', 'search', query] as const,
} as const;
