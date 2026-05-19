import { z } from "zod";

/**
 * JewelPetal — Environment Schema
 * Validates all required VITE_ variables for production readiness.
 */
const envSchema = z.object({
  // Shopify Core
  VITE_SHOPIFY_DOMAIN: z.string().min(1, "Shopify Domain is required."),
  VITE_SHOPIFY_TOKEN: z.string().min(1, "Shopify Storefront Token is required."),
  
  // Shopify Customer Account (Global Client ID)
  VITE_SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID: z.string().min(1, "Shopify Customer Account Client ID is required."),
  
  // Marketing & Analytics
  VITE_POSTHOG_KEY: z.string().optional(),
  VITE_POSTHOG_HOST: z.string().url().or(z.literal("")).optional().default("https://app.posthog.com"),
  VITE_SENTRY_DSN: z.string().url().or(z.literal("")).optional(),
});

export const validateEnv = () => {
  try {
    return envSchema.parse({
      VITE_SHOPIFY_DOMAIN: import.meta.env.VITE_SHOPIFY_DOMAIN,
      VITE_SHOPIFY_TOKEN: import.meta.env.VITE_SHOPIFY_TOKEN,
      VITE_SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID: import.meta.env.VITE_SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID,
      VITE_POSTHOG_KEY: import.meta.env.VITE_POSTHOG_KEY,
      VITE_POSTHOG_HOST: import.meta.env.VITE_POSTHOG_HOST,
      VITE_SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("❌ Invalid environment variables:", error.flatten().fieldErrors);
      throw new Error("Invalid environment configuration. Check your .env file.");
    }
  }
};

// Export validated env for usage across the app
export const env = validateEnv()!;
