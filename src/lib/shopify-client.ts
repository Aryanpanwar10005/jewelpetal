import { toast } from "sonner";
import { env } from "./env";

const SHOPIFY_API_VERSION = '2026-04';

/**
 * JewelPetal — Standardized Shopify API Fetcher
 */
export async function storefrontApiRequest(
  query: string, 
  variables: Record<string, unknown> = {}
) {
  const domain = env?.VITE_SHOPIFY_DOMAIN ?? "";
  const token = env?.VITE_SHOPIFY_TOKEN ?? "";

  // If no real Shopify credentials, skip the network call entirely
  if (!domain || domain === "mock-store.myshopify.com") {
    return undefined;
  }

  const cleanDomain = domain.replace(/^https?:\/\//i, '');
  const SHOPIFY_STOREFRONT_URL = `https://${cleanDomain}/api/${SHOPIFY_API_VERSION}/graphql.json`;

  try {
    const response = await fetch(SHOPIFY_STOREFRONT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query, variables }),
    });

    // Handle Production Billing Gaps
    if (response.status === 402) {
      toast.error("Shopify: Payment required.", {
        description: "Billing plan issue. Contact the administrator.",
      });
      return undefined;
    }

    if (!response.ok) {
      console.error(`Shopify API Error: ${response.status} ${response.statusText}`);
      return undefined;
    }

    const data = await response.json();
    
    if (data.errors) {
      const messages = data.errors.map((e: { message: string }) => e.message).join(', ');
      console.error(`Shopify GraphQL Error: ${messages}`);
      return undefined;
    }

    return data;
  } catch (error) {
    console.error("Shopify Network Error:", error);
    return undefined;
  }
}
