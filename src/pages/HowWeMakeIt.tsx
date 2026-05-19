import { Helmet } from 'react-helmet-async';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import product1 from '@/assets/images/product-std-9.png';
import product2 from '@/assets/images/romantic-luxury-flatlay.png';
import { Link } from 'react-router-dom';

const HowWeMakeIt = () => {
  const steps = [
    { name: "The Korean Wrapping Base", desc: "Every bouquet starts with heavy, premium waterproof wrapping sheets hand-layered in the classic double-cone structure to frame the jewelry perfectly.", tags: ["Premium Papers", "Double-Cone Layering"] },
    { name: "Hypoallergenic Jewelry Sourcing", desc: "We select only anti-tarnish brass, high-lustre freshwater pearls, and skin-safe metals, ensuring each piece is comfortable for all-day wear.", tags: ["Anti-Tarnish", "Hypoallergenic Brass"] },
    { name: "The Handcrafted Stem Curation", desc: "Artisans mount clips, bracelets, and rings onto specialized, non-abrasive stems, transforming wearable luxury into beautiful floral buds.", tags: ["Stem-Mounting", "Non-Abrasive Material"] },
    { name: "Color Palette Harmonization", desc: "From The Blush Romance to the moody Velvet Noir Collection, we color-coordinate every piece to form a balanced, high-fidelity fashion statement.", tags: ["Color Psychology", "Curation"] },
    { name: "Double-Sided French Satin Bows", desc: "Each bouquet is secured with heavy-weight, luxury double-sided satin ribbons hand-tied into the signature JewelPetal bow.", tags: ["French Satin", "Hand-Tied"] },
    { name: "The Sensory Blossom Mist", desc: "Just before boxing, we apply a gentle, hypoallergenic white floral scent spray to the outer layers to complete the unboxing experience.", tags: ["Sensory Finish", "Signature Scent"] }
  ];

  return (
    <div className="min-h-screen bg-jp-pearl text-jp-deep font-sans selection:bg-jp-rosegold selection:text-jp-pearl">
      <Helmet>
        <title>How We Make It — JewelPetal | Jewelry & Accessory Gift Bouquets India</title>
        <meta name="description" content="Step inside JewelPetal's Indian studio. Learn how our artisans handcraft premium hypoallergenic jewelry bouquets, wrap layers, and style luxury hair clips." />
        <link rel="canonical" href="https://jewelpetal.in/how-we-make-it" />
        <script type="application/ld+json">
          {`
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
              "name": "How We Make It",
              "item": "https://jewelpetal.in/how-we-make-it"
            }]
          }
          `}
        </script>
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": ${JSON.stringify(steps.map((step, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": step.name,
              "description": step.desc
            })))}
          }
          `}
        </script>
      </Helmet>

      <Navbar />

      <main>
        {/* Full-Bleed Gallery Header */}
        <section className="relative h-[65vh] w-full overflow-hidden flex items-center justify-center bg-jp-plum">
          <div className="absolute inset-0">
            <img 
              src={product2} 
              alt="Artisans preparing JewelPetal gift bouquets" 
              className="w-full h-full object-cover brightness-[0.7]"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-jp-plum via-transparent to-black/20" />
          </div>
          <div className="relative z-10 text-center px-6">
            <nav className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-jp-pearl/80 mb-8 animate-fade-in font-sans">
              <Link to="/" className="hover:text-jp-rosegold transition-colors">Home</Link>
              <span className="opacity-40">/</span>
              <span>How We Make It</span>
            </nav>
            <h1 className="font-serif text-4xl md:text-6xl text-jp-pearl leading-tight max-w-4xl mx-auto">
              Our Craft Process
            </h1>
          </div>
        </section>

        {/* The Exhibition Grid */}
        <section className="py-24 px-6 md:px-20 bg-jp-pearl">
          <div className="max-w-[1400px] mx-auto">
            <header className="mb-20 max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-jp-rosegold block mb-6 font-sans">The Studio</span>
              <h2 className="font-serif text-3xl md:text-5xl text-jp-plum mb-8 leading-tight">
                Every detail is considered. Every petal is wearable.
              </h2>
              <div className="bg-jp-blush/20 p-8 border-l-2 border-jp-rosegold rounded-r-sm">
                <p className="text-lg text-jp-deep/80 leading-relaxed font-serif italic">
                  Unlike traditional fresh bouquets that are destined to wilt, our team spends hours hand-curating, shaping, and positioning jewelry stems to build an everlasting visual statement.
                </p>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
              {steps.map((step, index) => (
                <div key={step.name} className="group flex flex-col">
                  <div className="relative aspect-[4/5] bg-jp-blush/10 overflow-hidden mb-8 rounded-sm shadow-sm">
                    <img 
                      src={[product1, product2][index % 2]}
                      alt={step.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                    />
                    <div className="absolute top-4 right-4 bg-jp-pearl/90 backdrop-blur-sm px-3 py-1 text-xs tracking-widest uppercase border border-jp-blush text-jp-plum font-sans font-medium">
                      Process Step 0{index + 1}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-serif text-2xl text-jp-plum group-hover:text-jp-rosegold transition-colors">
                      {step.name}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-jp-deep/75 leading-relaxed mb-6 max-w-[95%]">
                    {step.desc}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-jp-blush flex gap-4 text-xs tracking-widest uppercase text-jp-deep/40 font-sans">
                    {step.tags?.map(tag => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Narrative Split */}
        <section className="bg-jp-blush/10 py-24 px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-square md:aspect-[4/3] overflow-hidden rounded-sm shadow-sm">
            <img 
              src={product2} 
              alt="Nancy Gupta inspecting hand-finished bow styling" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="max-w-xl">
            <h2 className="font-serif text-3xl md:text-4xl text-jp-plum mb-8">What makes our bouquets special?</h2>
            <div className="space-y-6 text-jp-deep/80 leading-relaxed text-base">
              <p>
                Each bouquet includes a curated mix of earrings, hair accessories, rings, press-on nails, and dainty bracelets. We design each piece to look beautiful in the bouquet layout, but they are fully detachable and built to be worn for years.
              </p>
              <p>
                We use premium wrapping sheets and silk ribbons that hold their shape, making our bouquets double as beautiful dresser decor before they are fully unboxed.
              </p>
            </div>
            <a 
              href="/our-story" 
              className="inline-block mt-12 text-xs tracking-widest uppercase text-jp-plum border-b border-jp-rosegold py-2 hover:text-jp-rosegold transition-all font-sans"
            >
              Explore our story
            </a>
          </div>
        </section>

        {/* Global CTA */}
        <section className="py-32 px-6 bg-jp-pearl text-center">
          <div className="max-w-3xl mx-auto">
            <p className="font-serif italic text-2xl md:text-3xl text-jp-plum mb-12 leading-relaxed">
              Experience the craftsmanship for yourself.
            </p>
            <a 
              href="/#the-edit" 
              className="inline-block bg-jp-plum text-jp-pearl text-xs uppercase tracking-widest px-12 py-5 hover:bg-jp-rosegold transition-all duration-300 rounded-sm font-sans"
            >
              Discover Curated Bouquets
            </a>
          </div>
        </section>

        {/* Navigation Footer */}
        <article className="max-w-[1200px] mx-auto px-6 md:px-20 py-20 border-t border-jp-blush">
          <section>
            <span className="text-xs uppercase tracking-widest text-jp-deep/40 block mb-10 font-sans">Discover More</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <a href="/our-story" className="group">
                <span className="text-xs uppercase font-sans text-jp-rosegold block mb-2 opacity-60">01.</span>
                <span className="text-xl text-jp-plum border-b border-transparent group-hover:border-jp-rosegold transition-all font-serif">Our Story</span>
              </a>
              <a href="/gift-guide" className="group">
                <span className="text-xs uppercase font-sans text-jp-rosegold block mb-2 opacity-60">02.</span>
                <span className="text-xl text-jp-plum border-b border-transparent group-hover:border-jp-rosegold transition-all font-serif">Gift Curation Guide</span>
              </a>
              <a href="/faq" className="group">
                <span className="text-xs uppercase font-sans text-jp-rosegold block mb-2 opacity-60">03.</span>
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

export default HowWeMakeIt;
