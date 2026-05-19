import { useRef } from 'react';
import product1 from '@/assets/images/product-mini.png';
import product2 from '@/assets/images/product-std-9.png';
import robeProduct from '@/assets/images/new-mom-bouquet.png';
import bag from '@/assets/images/custom-gifting-box.png';
import { useProducts } from '@/features/products';
import { useCartStore } from '@/features/cart';
import { toast } from 'sonner';

const RitualsStrip = () => {
  const { data: products } = useProducts();
  const addItem = useCartStore((state) => state.addItem);
  const scrollRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Update progress bar via direct DOM — no React re-render on every scroll pixel
  const handleScroll = () => {
    const el = scrollRef.current;
    const bar = progressRef.current;
    if (!el || !bar) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const progress = maxScroll > 0 ? (el.scrollLeft / maxScroll) * 100 : 0;
    bar.style.width = `${progress}%`;
  };

  const rituals = [
    { title: 'The Mini Jewelry Ritual', tagline: 'A compact gesture featuring 1-5 jewelry items. Perfectly customizable and popular for bulk gifting.', price: '₹ 150 - ₹ 250', image: product2, handle: 'mini-jewelry-bouquet' },
    { title: 'The Standard 7-Item Ritual', tagline: 'Our signature gift bouquet holding 7 hand-rolled premium jewelry items to absolutely stun.', price: '₹ 599', image: product1, handle: 'standard-7-item-bouquet' },
    { title: 'The Standard 9-Item Ritual', tagline: 'A grand bouquet containing 9 coordinated jewelry and beauty elements nestled in pastel layers.', price: '₹ 699', image: robeProduct, handle: 'standard-9-item-bouquet' },
    { title: 'The Premium Custom Ritual', tagline: 'A magnificent bouquet of 10+ items customized for the occasion. Add chocolates, photos, or crochet items.', price: 'Starting ₹ 999', image: bag, handle: 'premium-custom-bouquet' },
  ];

  return (
    <section id="rituals" className="bg-jp-deep py-24 text-jp-pearl overflow-hidden">
      <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
        <div className="space-y-2">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-jp-rosegold font-semibold">
            Sensory Experiences
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-jp-pearl font-bold">
            The Gifting Rituals
          </h2>
        </div>
        <p className="hidden md:block font-serif italic text-sm text-jp-pearl/60">
          Scroll to explore & select
        </p>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto gap-8 px-6 pb-8 snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {rituals.map((ritual, idx) => (
          <button
            key={idx}
            onClick={() => {
              const product = products?.find(p => p.node.handle === ritual.handle);
              if (product) {
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
                  toast('Added to your bag.', {
                    description: product.node.title,
                    position: 'top-center',
                    className: 'bg-jp-pearl border-jp-dust text-jp-deep font-serif italic',
                  });
                  return;
                }
              }
              
              // Fallback demo toast
              toast('Demo bouquet added to your bag.', {
                description: ritual.title,
                position: 'top-center',
                className: 'bg-jp-pearl border-jp-dust text-jp-deep font-serif italic',
              });
            }}
            className="flex-none w-[85vw] md:w-[400px] snap-center group cursor-pointer text-left focus:outline-none"
          >
            <div className="aspect-[4/5] overflow-hidden mb-6 relative bg-jp-cream/10 border border-jp-dust/10">
              <img
                src={ritual.image}
                alt={ritual.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold">{ritual.title}</h3>
              <p className="font-sans text-xs text-jp-pearl/70 font-medium leading-relaxed">{ritual.tagline}</p>
              <div className="flex justify-between items-end mt-4">
                <span className="font-sans text-sm text-jp-rosegold font-semibold">{ritual.price}</span>
                <span className="font-sans text-[10px] uppercase tracking-widest border-b border-jp-pearl/30 pb-1 group-hover:border-jp-rosegold group-hover:text-jp-rosegold transition-colors font-semibold">
                  Shop the Ritual
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Scroll progress bar — updated via ref, no re-renders */}
      <div className="container mx-auto px-6 mt-4">
        <div className="h-[1px] bg-jp-pearl/20 relative">
          <div
            ref={progressRef}
            className="absolute top-0 left-0 h-full bg-jp-rosegold"
            style={{ width: '0%', transition: 'width 100ms linear' }}
          />
        </div>
      </div>
    </section>
  );
};

export default RitualsStrip;
