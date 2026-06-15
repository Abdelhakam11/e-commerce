import { useQuery } from '@tanstack/react-query';
import { getSingleProduct } from '../api/api';
import { queryKeys } from '../lib/queryKeys';

export function useProduct(id: string) {
  return useQuery({
    queryKey: queryKeys.product(id),
    queryFn: () => getSingleProduct(id),
    staleTime: 10 * 60 * 1000,
    enabled: Boolean(id),
  });
}
