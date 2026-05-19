import { useNavigate } from 'react-router-dom';
import product1 from '@/assets/images/product-std-7.png';
import product2 from '@/assets/images/product-premium.png';
import robeProduct from '@/assets/images/new-mom-bouquet.png';
import bag from '@/assets/images/custom-gifting-box.png';

const CollectionsGrid = () => {
  const navigate = useNavigate();

  const collections = [
    { 
      id: 'mini-jewelry-bouquet', 
      title: 'The Mini Jewelry Bouquet', 
      caption: 'An exquisite gesture featuring 1 to 5 jewelry items. Perfectly compact, available for bulk orders, and priced dynamically from ₹150 - ₹250.', 
      image: product2 
    },
    { 
      id: 'standard-7-item-bouquet', 
      title: 'The Standard 7-Item Bouquet', 
      caption: 'Our signature gifting ritual containing 7 handcrafted jewelry items arranged beautifully for birthdays and anniversaries at exactly ₹599.', 
      image: product1 
    },
    { 
      id: 'standard-9-item-bouquet', 
      title: 'The Standard 9-Item Bouquet', 
      caption: 'An elevated, luxury arrangement comprising 9 premium jewelry pieces nestled in exquisite pastel linen wrapping layers for ₹699.', 
      image: robeProduct 
    },
    { 
      id: 'premium-custom-bouquet', 
      title: 'The Premium Custom Bouquet', 
      caption: 'A grand luxury bouquet featuring more than 10 jewelry items. Starting at ₹999, customized for the occasion with optional chocolates, photographs, or crochet add-ons.', 
      image: bag 
    }
  ];

  return (
    <section id="collections" className="bg-jp-pearl pb-24 pt-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-3">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-jp-rosegold font-semibold">
            Handcrafted Themes
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-jp-deep font-bold">
            Find Her Bouquet
          </h2>
          <div className="w-12 h-[1px] bg-jp-rosegold/50 mx-auto pt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((item) => {
            const handleAction = () => {
              navigate(`/product/${item.id}`);
            };

            return (
              <div 
                key={item.id} 
                className="group relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-jp-rosegold/50 rounded-none bg-jp-pearl border border-jp-dust/10 p-2" 
                role="button"
                tabIndex={0}
                onClick={handleAction}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAction();
                  }
                }}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-jp-cream/10">
                  <div className="absolute inset-0 bg-jp-deep/0 group-hover:bg-jp-deep/20 transition-colors duration-500 z-10" />
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105" 
                  />

                  <div className="absolute bottom-8 left-8 z-20">
                    <h3 className="mb-2 drop-shadow-md font-serif font-bold text-2xl text-jp-pearl">
                      {item.title}
                    </h3>
                    <div className="w-0 h-[2px] bg-jp-rosegold group-hover:w-32 transition-all duration-500" />
                  </div>
                </div>
                <p className="mt-4 font-sans text-xs text-jp-charcoal/80 text-center font-medium leading-relaxed">
                  {item.caption}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CollectionsGrid;

