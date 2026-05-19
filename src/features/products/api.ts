import { storefrontApiRequest } from "@/lib/shopify-client";
import type { ShopifyProductNode } from "@/types/shopify";

/**
 * JewelPetal — Products Feature API
 */

export const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          seo { title description }
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 5) { edges { node { url altText } } }
          variants(first: 10) {
            edges {
              node {
                id title sku price { amount currencyCode }
                compareAtPrice { amount currencyCode }
                availableForSale
                selectedOptions { name value }
              }
            }
          }
          options { name values }
          metafield(namespace: "custom", key: "is_featured") { value }
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle
      seo { title description }
      priceRange { minVariantPrice { amount currencyCode } }
      images(first: 10) { edges { node { url altText } } }
      variants(first: 20) {
        edges {
          node {
            id title sku price { amount currencyCode }
            compareAtPrice { amount currencyCode }
            availableForSale
            selectedOptions { name value }
          }
        }
      }
      options { name values }
      careInstructions: metafield(namespace: "custom", key: "care_instructions") { value }
      materials: metafield(namespace: "custom", key: "materials") { value }
      dropName: metafield(namespace: "custom", key: "drop_name") { value }
    }
  }
`;

export async function getProducts(first = 20, query?: string) {
  const data = await storefrontApiRequest(PRODUCTS_QUERY, { first, query });
  return (data?.data?.products?.edges || []) as { node: ShopifyProductNode }[];
}

export async function getProductByHandle(handle: string) {
  const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
  return (data?.data?.product || null) as ShopifyProductNode | null;
}
