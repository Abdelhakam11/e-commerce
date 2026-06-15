import { useInfiniteQuery } from '@tanstack/react-query';
import { getProducts } from '../api/api';
import { queryKeys } from '../lib/queryKeys';

const PAGE_SIZE = 20;

export function useInfiniteProducts() {
  return useInfiniteQuery({
    queryKey: queryKeys.infiniteProducts,
    queryFn: ({ pageParam }) => getProducts(PAGE_SIZE, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce((sum, p) => sum + p.products.length, 0);
      return loaded < lastPage.total ? loaded : undefined;
    },
    staleTime: 5 * 60 * 1000,
  });
}
