import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingBag, Minus, Plus, X, Loader2 } from "lucide-react";
import { useCartStore } from "../cartStore";
import { useAuthStore } from "../../auth/authStore";
import posthog from "posthog-js";
import { cn } from "@/lib/utils";

interface CartDrawerProps {
  className?: string;
}

export const CartDrawer = ({ className }: CartDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);
  const currencyCode = items[0]?.price.currencyCode || '₹';

  useEffect(() => { 
    setMounted(true);
    if (isOpen) syncCart(); 
  }, [isOpen, syncCart]);

  const handleCheckout = () => {
    // Check authentication status via the BFF store
    const { isAuthenticated } = useAuthStore.getState();
    const checkoutUrl = getCheckoutUrl();

    if (!checkoutUrl) return;

    // --- GEO/Tracking (Checkout Intent) ---
    posthog.capture('checkout_intent', {
      total_items: totalItems,
      total_price: totalPrice,
      is_authenticated: isAuthenticated
    });

    if (!isAuthenticated) {
      // Intercept and send to Identity Portal (Guest vs Member Choice)
      setIsOpen(false);
      window.location.href = `/identity?redirect=${encodeURIComponent(checkoutUrl)}`;
      return;
    }

    // If already authenticated, proceed to Shopify checkout directly
    setIsOpen(false);
    window.location.href = checkoutUrl;
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className={cn("hover:text-jp-rosegold transition-colors relative flex items-center justify-center", className || "text-jp-deep")}>
          <ShoppingBag className="w-5 h-5" />
          {mounted && totalItems > 0 && (
            <span className="absolute -top-2 -right-2 font-sans text-[9px] w-4 h-4 flex items-center justify-center bg-jp-plum text-jp-pearl rounded-full animate-fade-in font-semibold">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-jp-pearl border-l border-jp-blush flex flex-col h-full p-0 selection:bg-jp-rosegold selection:text-jp-pearl">
        <SheetHeader className="px-8 pt-8 pb-6 border-b border-jp-blush">
          <SheetTitle className="font-serif text-2xl text-jp-plum">Your Bag</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-8 py-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center h-full">
              <p className="font-sans text-sm text-jp-deep/50 italic">Nothing here yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-4">
                  <div className="w-20 h-24 overflow-hidden flex-shrink-0 rounded-sm shadow-sm">
                    {item.product.node.images?.edges?.[0]?.node && (
                      <img src={item.product.node.images.edges[0].node.url} alt={item.product.node.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif text-sm text-jp-deep font-semibold leading-snug">{item.product.node.title}</h4>
                      <button onClick={() => removeItem(item.variantId)} className="text-jp-deep/40 hover:text-jp-plum transition-colors p-1">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    {item.variantTitle !== 'Default Title' && (
                      <p className="font-sans text-xs text-jp-deep/50 mt-1">{item.selectedOptions.map(o => o.value).join(' · ')}</p>
                    )}
                    <p className="font-sans text-xs text-jp-rosegold mt-1 font-semibold">
                      {currencyCode === 'INR' ? '₹' : currencyCode} {parseFloat(item.price.amount).toLocaleString()}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center border border-jp-blush text-jp-deep/60 hover:border-jp-rosegold transition-colors rounded-sm">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-sans text-xs w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center border border-jp-blush text-jp-deep/60 hover:border-jp-rosegold transition-colors rounded-sm">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="flex-shrink-0 px-8 py-6 border-t border-jp-blush space-y-4">
            <div className="flex justify-between items-center font-sans text-sm">
              <span className="text-xs uppercase tracking-widest text-jp-deep/60 font-semibold">Total</span>
              <span className="text-base text-jp-deep font-semibold">
                {currencyCode === 'INR' ? '₹' : currencyCode} {totalPrice.toLocaleString()}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isLoading || isSyncing}
              className="w-full bg-jp-plum text-jp-pearl py-4 font-sans text-xs uppercase tracking-widest hover:bg-jp-rosegold hover:text-jp-pearl transition-all duration-300 disabled:opacity-50 flex items-center justify-center font-semibold rounded-sm shadow-sm"
            >
              {isLoading || isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Proceed to Checkout'}
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
