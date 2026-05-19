import { Link } from 'react-router-dom';
import { ShopifyProduct } from '@/lib/shopify';
import { shopifyImage, shopifyImageSrcSet } from '@/lib/shopifyImage';
import { useProducts } from '../hooks/useProducts';
import { useCartStore } from '../../cart/cartStore';
import { ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

export const ProductGrid = () => {
  const { data: products, isLoading: loading } = useProducts();
  const addItem = useCartStore((state) => state.addItem);
  const isCartLoading = useCartStore((state) => state.isLoading);

  if (loading) {
    return (
      <section id="the-edit" className="bg-jp-pearl py-24">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-jp-plum mb-4">The Edit</h2>
          <p className="font-sans text-sm text-jp-deep/50 italic">Loading our collections...</p>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section id="the-edit" className="bg-jp-pearl py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl text-jp-plum mb-4">The Edit</h2>
          <p className="font-sans text-sm text-jp-deep/50 italic">New bouquets blooming soon. Check back shortly.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="the-edit" className="bg-jp-pearl py-24">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className="font-serif text-4xl text-jp-plum">The Edit</h2>
          <p className="font-sans text-sm text-jp-deep/50 mt-2 max-w-xl font-medium">
            Every arrangement is hand-selected and custom wrapped. Designed to stun, crafted to keep.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
          {products.map((product, index) => {
            const image = product.node.images.edges[0]?.node;
            const price = product.node.priceRange.minVariantPrice;
            const isPriority = index < 4;

            return (
              <Link
                to={`/product/${product.node.handle}`}
                key={product.node.id}
                id={`product-${product.node.handle}`}
                className="group cursor-pointer"
              >
                <div className="relative group/item">
                  <div className="aspect-[3/4] overflow-hidden mb-3 bg-jp-blush/10 rounded-sm shadow-sm">
                    {image ? (
                      <img
                        src={shopifyImage(image.url, 'medium')}
                        srcSet={shopifyImageSrcSet(image.url, ['small', 'medium'])}
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        alt={image.altText || product.node.title}
                        loading={isPriority ? "eager" : "lazy"}
                        fetchPriority={isPriority ? "high" : "auto"}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-serif italic text-jp-deep/20">JewelPetal</span>
                      </div>
                    )}
                  </div>

                  {/* Quick Add Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const variant = product.node.variants.edges[0]?.node;
                      if (variant) {
                        addItem({
                          product,
                          variantId: variant.id,
                          variantTitle: variant.title,
                          price: variant.price,
                          quantity: 1,
                          selectedOptions: variant.selectedOptions || [],
                        });
                        toast('Added to your gift bag.', {
                          description: product.node.title,
                          position: 'top-center',
                          className: 'bg-jp-pearl border-jp-blush text-jp-plum font-serif italic',
                        });
                      }
                    }}
                    disabled={isCartLoading}
                    className="absolute bottom-6 left-0 right-0 mx-4 bg-jp-pearl/90 backdrop-blur-sm text-jp-plum py-2.5 font-sans text-xs uppercase tracking-widest opacity-0 translate-y-2 pointer-events-none group-hover/item:opacity-100 group-hover/item:translate-y-0 group-hover/item:pointer-events-auto transition-all duration-300 flex items-center justify-center gap-2 hover:bg-jp-plum hover:text-jp-pearl shadow-sm rounded-sm font-semibold"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-jp-rosegold" />
                    Quick Add
                  </button>
                </div>
                <h3 className="font-serif text-base text-jp-deep leading-snug font-semibold">{product.node.title}</h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="font-sans text-sm text-jp-rosegold font-semibold">
                    {price.currencyCode === 'INR' ? '₹' : price.currencyCode} {parseFloat(price.amount).toLocaleString()}
                  </p>
                  {(() => {
                    const firstVariant = product.node.variants.edges[0]?.node;
                    if (firstVariant?.compareAtPrice &&
                        parseFloat(firstVariant.compareAtPrice.amount) > parseFloat(firstVariant.price.amount)) {
                      return (
                        <p className="font-sans text-xs text-jp-deep/25 line-through">
                          {firstVariant.compareAtPrice.currencyCode === 'INR' ? '₹' : firstVariant.compareAtPrice.currencyCode} {parseFloat(firstVariant.compareAtPrice.amount).toLocaleString()}
                        </p>
                      );
                    }
                    return null;
                  })()}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
