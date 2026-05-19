import { ArrowRight } from 'lucide-react';
import dropIntro from '@/assets/images/product-mini.png';

const DropIntro = () => {
  const scrollToCollections = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const el = document.getElementById('collection-01');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="collection-01" className="bg-jp-pearl py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center">
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/5] overflow-hidden bg-jp-cream/10 border border-jp-dust/10">
              <img 
                src={dropIntro} 
                alt="JewelPetal Blush Collection gift bouquet" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 space-y-8">
            <div className="space-y-2">
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-jp-rosegold font-semibold">
                Now Available
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-jp-deep font-bold leading-tight">
                The Blush Collection
              </h2>
            </div>
            
            <div className="space-y-6">
              <p className="font-serif italic text-xl md:text-2xl text-jp-charcoal leading-relaxed">
                A curated symphony of romantic pink tones, delicate rose gold finishes, and hand-styled botanical aesthetics. Each bouquet holds real, wearable jewelry, high-end hair accessories, and nails, designed to stay in her life forever.
              </p>
              <button
                onClick={scrollToCollections}
                className="group flex items-center space-x-2 font-sans text-xs uppercase tracking-widest text-jp-rosegold hover:text-jp-deep transition-colors pt-4 font-semibold"
              >
                <span>Explore the Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DropIntro;
