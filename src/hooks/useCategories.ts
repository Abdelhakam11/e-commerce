import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api/api';
import { queryKeys } from '../lib/queryKeys';

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: getCategories,
    staleTime: 30 * 60 * 1000,
  });
}
