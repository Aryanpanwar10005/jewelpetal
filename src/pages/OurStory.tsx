import { Helmet } from 'react-helmet-async';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import product1 from '@/assets/images/product-std-7.png';
import product2 from '@/assets/images/product-custom.png';
import { Link } from 'react-router-dom';

const OurStory = () => {
  return (
    <div className="min-h-screen bg-jp-pearl text-jp-deep font-sans selection:bg-jp-rosegold selection:text-jp-pearl">
      <Helmet>
        <title>Our Story — JewelPetal | Premium Jewelry & Accessory Gift Bouquets</title>
        <meta name="description" content="Discover how JewelPetal revolutionized the art of gifting in India. Handcrafted jewelry and fashion accessory bouquets designed to impress and made to last." />
        <link rel="canonical" href="https://jewelpetal.in/our-story" />
        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://jewelpetal.in"
              },{
                "@type": "ListItem",
                "position": 2,
                "name": "Our Story",
                "item": "https://jewelpetal.in/our-story"
              }]
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [{
                "@type": "Question",
                "name": "What is JewelPetal?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "JewelPetal is India's pioneer in luxury handcrafted jewelry and fashion accessory gift bouquets. We curate premium hypoallergenic jewelry, hair accessories, and nails, hand-styling them into breathtaking floral arrangements. It's a gorgeous alternative to traditional flowers, designed to stun and built to last."
                }
              }]
            }
          ])}
        </script>
      </Helmet>

      <Navbar />

      <main>
        {/* High-Fidelity Editorial Hero */}
        <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center bg-jp-plum">
          <div className="absolute inset-0">
            <img 
              src={product1} 
              alt="JewelPetal brand jewelry bouquet styling backdrop" 
              className="w-full h-full object-cover brightness-[0.7]"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-jp-plum via-transparent to-black/30" />
          </div>
          <div className="relative z-10 text-center px-6">
            <nav className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-jp-pearl/80 mb-12 animate-fade-in relative z-20 font-sans">
              <Link to="/" className="hover:text-jp-rosegold transition-colors">Home</Link>
              <span className="opacity-40">/</span>
              <span>Our Story</span>
            </nav>
            <h1 className="font-serif text-5xl md:text-8xl text-jp-pearl leading-tight max-w-5xl mx-auto">
              Where your love blooms.
            </h1>
          </div>
        </section>

        {/* Narrative Section 1: The Brand */}
        <section className="py-24 px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-jp-pearl">
          <div className="max-w-xl mx-auto lg:mx-0 order-2 lg:order-1">
            <span className="text-xs uppercase tracking-widest text-jp-rosegold block mb-6 font-sans">The Concept</span>
            <h2 className="font-serif text-3xl md:text-5xl text-jp-plum mb-8 leading-tight">
              Giving her a gesture that never wilts.
            </h2>
            <div className="text-lg text-jp-deep/80 leading-relaxed space-y-6">
              <p>
                Flowers are beautiful, but they wilt in a few days. Chocolates are sweet, but they are gone in minutes. We wanted to design a gift that carried the absolute romance of fresh flowers while keeping its value forever.
              </p>
              <p>
                JewelPetal combines the aesthetic wonder of custom flower bouquets with high-quality jewelry. Each accessory is styled as a delicate &ldquo;bloom,&rdquo; curated to harmonize in color, design, and metals. The result is a jaw-dropping unboxing experience she will always remember.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] bg-jp-blush/10 overflow-hidden order-1 lg:order-2 rounded-sm shadow-sm">
            <img 
              src={product2} 
              alt="Close-up of styled accessory petals in JewelPetal gift bouquet" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
            />
          </div>
        </section>

        {/* Narrative Section 2: The Origin */}
        <section className="py-24 px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-jp-blush/10">
          <div className="relative aspect-[4/5] bg-jp-rosegold/5 overflow-hidden rounded-sm shadow-sm">
            <img 
              src={product1} 
              alt="Meticulously crafted jewelry gifts made in India" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
            />
          </div>
          <div className="max-w-xl mx-auto lg:ml-20">
            <span className="text-xs uppercase tracking-widest text-jp-rosegold block mb-6 font-sans">The Craft</span>
            <h2 className="font-serif text-3xl md:text-5xl text-jp-plum mb-8 leading-tight">
              Handcrafted in India, down to the last bow.
            </h2>
            <div className="text-lg text-jp-deep/80 leading-relaxed space-y-6">
              <p>
                We source only premium, skin-safe, hypoallergenic metals, high-sheen pearls, and custom luxury press-on nails. Every accessory in a JewelPetal bouquet is curated to look breathtaking in the bundle and stunning on her body.
              </p>
              <p>
                Our specialized team handles every wrapping layer, ribbon, and card detailing in our studio. We believe that true luxury lies in the details that most brands rush past.
              </p>
            </div>
          </div>
        </section>

        {/* Cinematic Panoramic Break */}
        <section className="h-[60vh] md:h-[70vh] w-full relative overflow-hidden bg-jp-rosegold/10">
          <img 
            src={product2} 
            alt="Beautiful premium packaging by JewelPetal" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-jp-plum/10" />
        </section>

        {/* Narrative Section 3: The Model */}
        <section className="py-32 px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-jp-pearl">
          <div className="max-w-xl mx-auto lg:mx-0 order-2 lg:order-1">
            <span className="text-xs uppercase tracking-widest text-jp-rosegold block mb-6 font-sans">Our Collections</span>
            <h2 className="font-serif text-3xl md:text-5xl text-jp-plum mb-8 leading-tight">
              Curated themes or completely custom designs.
            </h2>
            <div className="text-lg text-jp-deep/80 leading-relaxed space-y-6">
              <p>
                JewelPetal offers signature coordinated color themes (like *The Blush Romance* or *Velvet Noir Bouquet*) as well as seasonal limited releases.
              </p>
              <p>
                For those looking for a personal touch, our *Custom Bouquet Curation* service lets you pick metals, accessory classes, and ring sizes to fit her unique personality perfectly.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] bg-jp-blush/10 overflow-hidden order-1 lg:order-2 rounded-sm shadow-sm">
            <img 
              src={product1} 
              alt="JewelPetal signature custom creation options" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
            />
          </div>
        </section>

        {/* Global CTA */}
        <section className="py-32 px-6 bg-jp-blush/20 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="font-serif italic text-2xl md:text-4xl text-jp-plum mb-12 leading-relaxed">
              Explore our bouquets and find her perfect fit.
            </p>
            <a 
              href="/#the-edit" 
              className="inline-block bg-jp-plum text-jp-pearl text-xs uppercase tracking-widest px-12 py-5 hover:bg-jp-rosegold transition-all duration-300 rounded-sm font-sans"
            >
              Shop the Collection
            </a>
          </div>
        </section>

        {/* Navigation Footer */}
        <article className="max-w-[1200px] mx-auto px-6 md:px-20 py-20 border-t border-jp-blush">
          <section>
            <span className="text-xs uppercase tracking-widest text-jp-deep/40 block mb-10 font-sans">Related Pages</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <a href="/how-we-make-it" className="group">
                <span className="text-xs uppercase font-sans text-jp-rosegold block mb-2 opacity-60 group-hover:opacity-100 transition-opacity">01.</span>
                <span className="text-xl text-jp-plum border-b border-transparent group-hover:border-jp-rosegold transition-all font-serif">How We Make It</span>
              </a>
              <a href="/gift-guide" className="group">
                <span className="text-xs uppercase font-sans text-jp-rosegold block mb-2 opacity-60 group-hover:opacity-100 transition-opacity">02.</span>
                <span className="text-xl text-jp-plum border-b border-transparent group-hover:border-jp-rosegold transition-all font-serif">Gift Curation Guide</span>
              </a>
              <a href="/faq" className="group">
                <span className="text-xs uppercase font-sans text-jp-rosegold block mb-2 opacity-60 group-hover:opacity-100 transition-opacity">03.</span>
                <span className="text-xl text-jp-plum border-b border-transparent group-hover:border-jp-rosegold transition-all font-serif">Gifting FAQ</span>
              </a>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default OurStory;
