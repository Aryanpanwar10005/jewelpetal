import { Link } from 'react-router-dom';
import { useCartStore } from '@/features/cart';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { shopifyImage, shopifyImageSrcSet } from '@/lib/shopifyImage';
import product1 from '@/assets/images/product-std-7.png';
import { useProducts } from '@/features/products';
import { ShopifyProduct } from '@/lib/shopify';

const FEATURED_HANDLE = import.meta.env.VITE_FEATURED_PRODUCT_HANDLE || 'standard-7-item-bouquet';

const FeaturedProduct = () => {
  const { data: products } = useProducts();
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);

  // Priority order:
  // 1. Product with is_featured metafield = 'true'
  // 2. Product matching VITE_FEATURED_PRODUCT_HANDLE env var
  // 3. First product in the list
  const product: ShopifyProduct | undefined = products
    ? (
        products.find((p: ShopifyProduct) => p.node.metafield?.value === 'true')
        ?? products.find((p: ShopifyProduct) => p.node.handle === FEATURED_HANDLE)
        ?? products[0]
      )
    : undefined;

  const handleAddToCart = async () => {
    if (!product) {
      toast('Demo bouquet added to your bag.', {
        description: 'Standard 7-Item Bouquet (Demo)',
        position: 'top-center',
        className: 'bg-jp-pearl border-jp-dust text-jp-deep font-serif italic',
      });
      return;
    }
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast('Added to your bag.', {
      description: product.node.title,
      position: 'top-center',
      className: 'bg-jp-pearl border-jp-dust text-jp-deep font-serif italic',
    });
  };

  const price = product?.node.priceRange.minVariantPrice;
  const rawUrl = product?.node.images.edges[0]?.node.url;
  const imageAlt = product?.node.images.edges[0]?.node.altText || product?.node.title || 'Featured product.';

  return (
    <section className="bg-jp-pearl py-24 border-t border-jp-dust/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-2">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-jp-rosegold font-semibold">
            Our Most-Gifted Bouquet
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-jp-deep font-bold">
            Signature Design
          </h3>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          <Link to={product ? `/product/${product.node.handle}` : '#'} className="w-full lg:w-3/5">
            <div className="relative aspect-video overflow-hidden bg-jp-cream/10 border border-jp-dust/10">
              <img
                src={rawUrl ? shopifyImage(rawUrl, 'large') : product1}
                srcSet={rawUrl ? shopifyImageSrcSet(rawUrl, ['medium', 'large', 'hero']) : undefined}
                sizes="(max-width: 1024px) 100vw, 60vw"
                alt={imageAlt}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </Link>

          <div className="w-full lg:w-2/5 space-y-8">
            <div className="space-y-4">
              <h3 className="font-serif text-3xl md:text-4xl text-jp-deep font-bold leading-tight">
                {product?.node.title || 'The Standard 7-Item Bouquet'}
              </h3>
              <p className="font-sans text-sm text-jp-charcoal/80 leading-relaxed font-medium">
				{product?.node.description
				  ? product.node.description.length > 200
					? product.node.description.slice(0, 200) + '...'
					: product.node.description
				  : 'Our signature gift bouquet holding 7 premium jewelry items (exquisite earrings, dainty necklace, classic bracelet, elegant rings, and hair claws) arranged beautifully with luxury wrapping sheets and hand-tied satin ribbons to amaze and delight her on any special occasion.'}
			  </p>
              <p className="font-sans text-lg text-jp-rosegold font-semibold mt-2">
                {price 
                  ? `${price.currencyCode === 'INR' ? '₹' : price.currencyCode} ${parseFloat(price.amount).toLocaleString()}`
                  : '₹ 599'}
              </p>
            </div>

            <blockquote className="font-serif italic text-2xl text-jp-deep leading-relaxed border-l-2 border-jp-rosegold pl-6 py-2">
              "A breathtaking alternative to standard flowers. She will always remember the moment she unwrapped real jewelry."
            </blockquote>

            <button
              onClick={handleAddToCart}
              disabled={isCartLoading}
              className="text-jp-deep font-sans uppercase text-xs tracking-widest border-b border-jp-rosegold pb-1 hover:text-jp-rosegold transition-colors disabled:opacity-50 flex items-center gap-2 font-semibold"
            >
              {isCartLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Add to Bag'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
