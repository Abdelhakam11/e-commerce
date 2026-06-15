import { useQuery } from '@tanstack/react-query';
import { searchProducts } from '../api/api';
import { queryKeys } from '../lib/queryKeys';

interface UseProductSearchOptions {
  minLength?: number;
}

export function useProductSearch(query: string, options: UseProductSearchOptions = {}) {
  const { minLength = 3 } = options;
  return useQuery({
    queryKey: queryKeys.productSearch(query),
    queryFn: () => searchProducts(query),
    staleTime: 2 * 60 * 1000,
    enabled: query.length >= minLength,
  });
}
