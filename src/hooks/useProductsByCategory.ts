import { useQuery } from '@tanstack/react-query';
import { getByCategory } from '../api/api';
import { queryKeys } from '../lib/queryKeys';

export function useProductsByCategory(category: string, limit = 0) {
  return useQuery({
    queryKey: queryKeys.productsByCategory(category, limit),
    queryFn: () => getByCategory(category, limit),
    staleTime: 5 * 60 * 1000,
    enabled: Boolean(category),
  });
}
