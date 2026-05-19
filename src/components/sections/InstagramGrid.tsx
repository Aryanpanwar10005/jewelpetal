import { Instagram } from 'lucide-react';
import product1 from '@/assets/images/product-std-7.png';
import product2 from '@/assets/images/product-premium.png';
import robeProduct from '@/assets/images/new-mom-bouquet.png';
import bag from '@/assets/images/custom-gifting-box.png';
import couple from '@/assets/images/romantic-luxury-flatlay.png';
import napkin from '@/assets/images/satin-ribbon-styling.png';

const InstagramGrid = () => {
  const posts = [
    { src: product1, alt: 'Signature Pink Bouquet' },
    { src: product2, alt: 'Noir Glamour Accessories Bouquet' },
    { src: couple, alt: 'Romantic Luxury Flatlay Bouquet' },
    { src: robeProduct, alt: 'The New Mom Bouquet Styling' },
    { src: napkin, alt: 'Luxury Satin Ribbon Packaging' },
    { src: bag, alt: 'Custom JewelPetal Box Arrangement' },
  ];

  return (
    <section className="bg-jp-pearl py-24 border-t border-jp-dust/20">
      <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
        <div className="space-y-2">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-jp-rosegold font-semibold">
            Visual Studio
          </span>
          <h2 className="font-serif text-3xl font-bold text-jp-deep">
            @jewelpetal.in
          </h2>
        </div>
        <a 
          href="https://www.instagram.com/jewelpetal.in" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest hover:text-jp-rosegold text-jp-deep transition-colors font-semibold"
        >
          <Instagram className="w-4 h-4" />
          <span>Follow Us</span>
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 px-2">
        {posts.map((post, index) => (
          <div 
            key={index} 
            className="group relative aspect-square overflow-hidden cursor-pointer bg-jp-cream/10 border border-jp-dust/10"
          >
            <div className="absolute inset-0 bg-jp-deep/0 group-hover:bg-jp-deep/30 transition-colors duration-300 z-10 flex items-center justify-center">
              <span className="font-serif font-bold text-jp-pearl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 group-hover:scale-100">
                JewelPetal
              </span>
            </div>
            <img 
              src={post.src} 
              alt={post.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-100 group-hover:brightness-95"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstagramGrid;
