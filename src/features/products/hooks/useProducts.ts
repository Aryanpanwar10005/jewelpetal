import { useQuery } from '@tanstack/react-query';
import { storefrontApiRequest, PRODUCTS_QUERY, ShopifyProduct } from '@/lib/shopify';
import { MOCK_PRODUCTS } from '../mockData';

export function useProducts() {
  return useQuery<ShopifyProduct[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 50 });
      const products = data?.data?.products?.edges ?? [];
      if (!products || products.length === 0) {
        return MOCK_PRODUCTS;
      }
      return products;
    },
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
}
