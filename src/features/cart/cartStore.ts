import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  CartItem,
  ShopifyProduct,
  createShopifyCart,
  addLineToShopifyCart,
  updateShopifyCartLine,
  removeLineFromShopifyCart,
  storefrontApiRequest,
  CART_QUERY,
} from '@/lib/shopify';
import posthog from 'posthog-js';

export type { CartItem, ShopifyProduct };

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  isSyncing: boolean;
  addItem: (item: Omit<CartItem, 'lineId'>) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
  clearCart: () => void;
  syncCart: () => Promise<void>;
  getCheckoutUrl: () => string | null;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,
      isSyncing: false,

      addItem: async (item) => {
        const { items, cartId, clearCart } = get();
        const existingItem = items.find(i => i.variantId === item.variantId);
        const previousItems = [...items]; // Snapshot for rollback
        
        // Optimistic Update
        if (existingItem) {
          set({ items: items.map(i => i.variantId === item.variantId ? { ...i, quantity: i.quantity + item.quantity } : i) });
        } else {
          set({ items: [...items, { ...item, lineId: null }] });
        }

        set({ isLoading: true });
        
        const captureSuccess = () => {
          posthog.capture('add_to_cart', {
            product_id: item.product.node.id,
            product_title: item.product.node.title,
            variant_id: item.variantId,
            variant_title: item.variantTitle,
            price: item.price.amount,
            currency: item.price.currencyCode,
            quantity: item.quantity
          });
        };

        const captureFailure = (error: unknown) => {
          set({ items: previousItems }); // Rollback
          posthog.capture('add_to_cart_failed', {
            product_id: item.product.node.id,
            product_title: item.product.node.title,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        };

        try {
          if (!cartId) {
            const result = await createShopifyCart(item);
            if (result) {
              set({ cartId: result.cartId, checkoutUrl: result.checkoutUrl, items: [{ ...item, lineId: result.lineId }] });
              captureSuccess();
            } else {
              set({ items: previousItems });
            }
          } else {
            if (existingItem) {
              const newQuantity = existingItem.quantity + item.quantity;
              if (!existingItem.lineId) {
                // Should not happen with optimistic UI but just in case
                set({ items: previousItems });
                return;
              }
              const result = await updateShopifyCartLine(cartId, existingItem.lineId, newQuantity);
              if (result.success) {
                captureSuccess();
              } else {
                set({ items: previousItems });
                if (result.cartNotFound) clearCart();
              }
            } else {
              const result = await addLineToShopifyCart(cartId, item);
              if (result.success) {
                set({ items: get().items.map(i => i.variantId === item.variantId ? { ...i, lineId: result.lineId ?? null } : i) });
                captureSuccess();
              } else {
                set({ items: previousItems });
                if (result.cartNotFound) clearCart();
              }
            }
          }
        } catch (error) {
          console.error('Failed to add item:', error);
          captureFailure(error);
        } finally {
          set({ isLoading: false });
        }
      },

      updateQuantity: async (variantId, quantity) => {
        if (quantity <= 0) { await get().removeItem(variantId); return; }
        const { items, cartId, clearCart } = get();
        const item = items.find(i => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;
        
        const previousItems = [...items];
        // Optimistic Update
        set({ items: items.map(i => i.variantId === variantId ? { ...i, quantity } : i), isLoading: true });
        
        try {
          const result = await updateShopifyCartLine(cartId, item.lineId, quantity);
          if (!result.success) {
            set({ items: previousItems });
            if (result.cartNotFound) clearCart();
          }
        } catch (error) { 
          console.error('Failed to update quantity:', error);
          set({ items: previousItems }); // Rollback
        }
        finally { set({ isLoading: false }); }
      },

      removeItem: async (variantId) => {
        const { items, cartId, clearCart } = get();
        const item = items.find(i => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;
        set({ isLoading: true });
        try {
          const result = await removeLineFromShopifyCart(cartId, item.lineId);
          if (result.success) {
            const newItems = get().items.filter(i => i.variantId !== variantId);
            if (newItems.length === 0) {
              clearCart();
            } else {
              set({ items: newItems });
            }
          } else if (result.cartNotFound) { clearCart(); }
        } catch (error) { console.error('Failed to remove item:', error); }
        finally { set({ isLoading: false }); }
      },

      clearCart: () => set({ items: [], cartId: null, checkoutUrl: null }),
      getCheckoutUrl: () => get().checkoutUrl,

      syncCart: async () => {
        const { cartId, isSyncing, clearCart } = get();
        if (!cartId || isSyncing) return;
        set({ isSyncing: true });
        try {
          const data = await storefrontApiRequest(CART_QUERY, { id: cartId });
          if (!data) return;
          const cart = data?.data?.cart;
          if (!cart || cart.totalQuantity === 0) clearCart();
        } catch (error) { console.error('Failed to sync cart:', error); }
        finally { set({ isSyncing: false }); }
      },
    }),
    {
      name: 'shopify-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, cartId: state.cartId, checkoutUrl: state.checkoutUrl }),
    }
  )
);
