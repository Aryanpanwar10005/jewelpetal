import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, ShopifyProduct } from '@/lib/shopify';
import { shopifyImage, shopifyImageSrcSet } from '@/lib/shopifyImage';
import { useCartStore } from '@/features/cart';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import posthog from 'posthog-js';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MOCK_PRODUCTS } from '@/features/products/mockData';

type ProductNode = ShopifyProduct['node'];

const ProductPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ProductNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let fetchedProduct = null;
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        if (data?.data?.product) {
          fetchedProduct = data.data.product;
        } else {
          // Fallback to local mock products
          const mockMatch = MOCK_PRODUCTS.find(p => p.node.handle === handle);
          if (mockMatch) {
            fetchedProduct = mockMatch.node;
          }
        }

        if (fetchedProduct) {
          setProduct(fetchedProduct);
          posthog.capture('product_viewed', {
            product_id: fetchedProduct.id,
            product_title: fetchedProduct.title,
            product_handle: fetchedProduct.handle,
            price: fetchedProduct.variants.edges[0]?.node?.price?.amount,
            currency: fetchedProduct.variants.edges[0]?.node?.price?.currencyCode,
          });
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };
    if (handle) fetchProduct();
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-jp-pearl">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="w-6 h-6 animate-spin text-jp-rosegold" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-jp-pearl">
        <Navbar />
        <div className="pt-32 text-center">
          <p className="font-serif italic text-jp-plum text-xl">Bouquet Not Found.</p>
          <Link to="/" className="font-sans text-xs uppercase tracking-widest text-jp-rosegold mt-4 inline-block font-semibold">← Back to JewelPetal</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images.edges;
  const variants = product.variants.edges;
  const selectedVariant = variants[selectedVariantIndex]?.node;
  const price = selectedVariant?.price;

  // --- SEO: Shopify seo.title / seo.description take priority over product title/description
  const pageTitle = product.seo?.title
    ? `${product.seo.title} — JewelPetal`
    : `${product.title} — JewelPetal`;
  const rawDescription = product.seo?.description
    || product.description
    || `${product.title} — Handcrafted accessory & jewelry gift bouquets from JewelPetal India.`;
  const pageDescription = rawDescription.length > 155
    ? `${rawDescription.slice(0, 152).trim()}...`
    : rawDescription;
  const canonicalUrl = `https://jewelpetal.in/product/${product.handle}`;
  const ogImage = shopifyImage(images[0]?.node.url, 'hero', 85);
  const ogImageAlt = images[0]?.node.altText || `${product.title} — JewelPetal`;
  const priceValidUntil = `${new Date().getFullYear()}-12-31`;

  // --- Schema.org Product structured data ---
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: images.map(img => shopifyImage(img.node.url, 'large')),
    brand: { '@type': 'Brand', name: 'JewelPetal' },
    url: canonicalUrl,
    ...(selectedVariant?.sku ? { sku: selectedVariant.sku } : {}),
    offers: {
      '@type': 'Offer',
      price: selectedVariant?.price.amount,
      priceCurrency: selectedVariant?.price.currencyCode || 'INR',
      availability: selectedVariant?.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: canonicalUrl,
      priceValidUntil,
      seller: { '@type': 'Organization', name: 'JewelPetal' },
    },
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast('Added to your gift bag.', {
      description: product.title,
      position: 'top-center',
    });
  };

  return (
    <div className="min-h-screen bg-jp-pearl text-jp-deep font-sans selection:bg-jp-rosegold selection:text-jp-pearl">

      {/* ── Per-product SEO head ── */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="og:product" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={ogImageAlt} />
        <meta property="og:image:width" content="1400" />
        <meta property="og:image:height" content="1050" />
        <meta property="og:site_name" content="JewelPetal" />
        <meta property="product:price:amount" content={selectedVariant?.price.amount} />
        <meta property="product:price:currency" content={selectedVariant?.price.currencyCode || 'INR'} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={ogImageAlt} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      </Helmet>

      <Navbar />

      <div className="pt-24">
        {images.length > 0 && (
          <div className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
            <img
              src={shopifyImage(images[activeImage]?.node.url, 'hero')}
              srcSet={shopifyImageSrcSet(images[activeImage]?.node.url, ['medium', 'large', 'hero'])}
              sizes="100vw"
              alt={images[activeImage]?.node.altText || product.title}
              fetchPriority="high"
              loading="eager"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row gap-16">

            {/* Image stack */}
            <div className="w-full lg:w-3/5 space-y-4">
              {images.map((img: { node: { url: string; altText: string | null } }, i: number) => (
                <div
                  key={i}
                  className={`aspect-[4/5] overflow-hidden cursor-pointer rounded-sm shadow-sm transition-all ${activeImage === i ? 'ring-2 ring-jp-rosegold' : ''}`}
                  onClick={() => setActiveImage(i)}
                >
                  <img
                    src={shopifyImage(img.node.url, 'large')}
                    srcSet={shopifyImageSrcSet(img.node.url, ['medium', 'large'])}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    alt={img.node.altText || product.title}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Product details */}
            <div className="w-full lg:w-2/5 lg:sticky lg:top-32 lg:self-start space-y-8">
              <div>
                <Link to="/" className="font-sans text-xs uppercase tracking-widest text-jp-deep/40 hover:text-jp-rosegold transition-colors mb-6 inline-block font-semibold">
                  ← The Edit
                </Link>
                <h1 className="font-serif text-4xl text-jp-plum mt-4">{product.title}</h1>
                {price && (
                  <div className="flex items-baseline gap-3 mt-2 font-sans">
                    <p className="text-lg text-jp-rosegold font-semibold">
                      {price.currencyCode === 'INR' ? '₹' : price.currencyCode} {parseFloat(price.amount).toLocaleString()}
                    </p>
                    {selectedVariant?.compareAtPrice &&
                      parseFloat(selectedVariant.compareAtPrice.amount) > parseFloat(price.amount) && (
                      <p className="text-sm text-jp-deep/30 line-through">
                        {selectedVariant.compareAtPrice.currencyCode === 'INR' ? '₹' : selectedVariant.compareAtPrice.currencyCode} {parseFloat(selectedVariant.compareAtPrice.amount).toLocaleString()}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* materials */}
              {product.materials?.value && (
                <p className="font-sans text-xs uppercase tracking-widest text-jp-rosegold font-medium">
                  Materials: {product.materials.value}
                </p>
              )}

              <p className="text-base text-jp-deep/75 leading-relaxed font-sans">
                {product.description}
              </p>

              {/* care instructions */}
              {product.careInstructions?.value && (
                <div className="pt-4 border-t border-jp-blush">
                  <p className="font-sans text-xs uppercase tracking-widest text-jp-rosegold font-medium mb-2">Care Instructions</p>
                  <p className="text-sm text-jp-deep/60 leading-relaxed font-sans">
                    {product.careInstructions.value}
                  </p>
                </div>
              )}

              {/* Variant selection */}
              {product.options?.length > 0 && product.options[0].name !== 'Title' && (
                <div className="space-y-4">
                  {product.options.map((option: { name: string; values: string[] }, oi: number) => (
                    <div key={oi}>
                      <p className="font-sans text-xs uppercase tracking-widest text-jp-deep/50 mb-2 font-medium">{option.name}</p>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value: string, vi: number) => {
                          const variantIdx = variants.findIndex((v: { node: { selectedOptions: Array<{ name: string; value: string }> } }) =>
                            v.node.selectedOptions.some((so) => so.name === option.name && so.value === value)
                          );
                          const isSelected = variantIdx === selectedVariantIndex;
                          return (
                            <button
                              key={vi}
                              onClick={() => setSelectedVariantIndex(variantIdx >= 0 ? variantIdx : 0)}
                              className={`px-4 py-2 font-sans text-xs border transition-colors rounded-sm ${
                                isSelected
                                  ? 'border-jp-plum text-jp-plum bg-jp-blush/20 font-semibold'
                                  : 'border-jp-blush text-jp-deep/50 hover:border-jp-rosegold'
                              }`}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={isCartLoading || !selectedVariant?.availableForSale}
                className="w-full bg-jp-plum text-jp-pearl py-4 font-sans text-xs uppercase tracking-widest hover:bg-jp-rosegold hover:text-jp-pearl transition-all duration-300 disabled:opacity-50 flex items-center justify-center font-semibold rounded-sm shadow-sm"
              >
                {isCartLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : !selectedVariant?.availableForSale ? 'Sold Out' : 'Add to Gift Bag'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
