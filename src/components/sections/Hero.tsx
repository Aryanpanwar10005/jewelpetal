import { useRef, useEffect } from 'react';
import heroBg from '@/assets/images/product-custom.png';

const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (parallaxRef.current) {
          parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToCollections = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const el = document.getElementById('collection-01');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[90vh] md:h-screen w-full overflow-hidden bg-jp-pearl">
      <div
        ref={parallaxRef}
        className="absolute z-0"
        style={{ willChange: 'transform', top: '-10%', left: 0, right: 0, bottom: '-10%' }}
      >
        <img
          src={heroBg}
          alt="JewelPetal handcrafted jewelry gift bouquet"
          className="w-full h-full object-cover object-center"
          fetchPriority="high"
          loading="eager"
        />
        {/* Deep luxurious gradient overlay to ensure text is beautifully readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-jp-deep/80 via-jp-deep/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-jp-deep/30 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 h-full container mx-auto px-6 pt-32 flex flex-col justify-between pb-16">
        <div className="space-y-6 max-w-2xl mt-12 md:mt-24">
          <h1 className="font-serif font-bold text-jp-pearl text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight drop-shadow-sm animate-bloom-in">
            The Gift Bouquet She Actually Keeps.
          </h1>
          <p className="font-serif italic text-jp-pearl/90 text-base md:text-xl max-w-lg leading-relaxed">
            Jewelry & fashion accessories, hand-styled as a stunning gift bouquet. For every occasion she deserves to celebrate.
          </p>
          <div className="pt-4">
            <button
              onClick={scrollToCollections}
              className="px-8 py-3.5 bg-jp-rosegold hover:bg-jp-petal text-jp-pearl font-sans text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 rounded-none shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              Discover Her Bouquet
            </button>
          </div>
        </div>

        <div className="hidden md:flex justify-between items-center text-jp-pearl/80">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] font-medium">
            ✦ Real Wearable Jewelry ✦ Hand-Styled in India
          </p>
          <span className="font-serif italic text-sm text-jp-petal font-medium">
            The Blush Collection 2026
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
