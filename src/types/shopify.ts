/**
 * JewelPetal — Centralized Shopify Types
 * Finalized for production architecture.
 */

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  sku: string;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  availableForSale: boolean;
  selectedOptions: Array<{ name: string; value: string }>;
}

export interface ShopifyProductNode {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: {
    minVariantPrice: ShopifyMoney;
  };
  images: {
    edges: Array<{ node: ShopifyImage }>;
  };
  variants: {
    edges: Array<{ node: ShopifyVariant }>;
  };
  options: Array<{
    name: string;
    values: string[];
  }>;
  seo: {
    title: string | null;
    description: string | null;
  };
  // Metafields
  careInstructions?: { value: string } | null;
  materials?: { value: string } | null;
  dropName?: { value: string } | null;
  metafield?: { value: string } | null; // is_featured flag
}

export interface ShopifyProduct {
  node: ShopifyProductNode;
}

export interface CartItem {
  lineId: string | null;
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: ShopifyMoney;
  quantity: number;
  selectedOptions: Array<{ name: string; value: string }>;
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  products: {
    edges: ShopifyProduct[];
  };
}
