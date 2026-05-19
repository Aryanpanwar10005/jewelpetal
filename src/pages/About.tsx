import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Helmet } from 'react-helmet-async';
import product1 from '@/assets/images/product-std-9.png';
import product2 from '@/assets/images/product-custom.png';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-jp-pearl animate-fade-in text-jp-deep selection:bg-jp-rosegold selection:text-jp-pearl">
      <Helmet>
        <title>About JewelPetal — Handcrafted Jewelry & Accessory Gift Bouquets</title>
        <meta name="description" content="Discover the story of JewelPetal. Founded by Nancy Gupta with a simple vision: flowers die in days, so we make gift bouquets she actually keeps, filled with stunning premium jewelry." />
        <link rel="canonical" href="https://jewelpetal.in/about" />
        <script type="application/ld+json">
          {JSON.stringify({
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
              "name": "About",
              "item": "https://jewelpetal.in/about"
            }]
          })}
        </script>
      </Helmet>
      <Navbar />
      
      <main>
        {/* Editorial Split Hero */}
        <section className="relative min-h-[90vh] w-full grid grid-cols-1 lg:grid-cols-2 bg-jp-pearl">
          <div className="flex flex-col justify-center px-6 md:px-20 py-32 order-2 lg:order-1">
            <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-jp-plum/60 mb-16 font-sans">
              <Link to="/" className="hover:text-jp-rosegold transition-colors">Home</Link>
              <span className="opacity-40">/</span>
              <span>About JewelPetal</span>
            </nav>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-jp-plum leading-[0.9] mb-12">
              The bouquet<br/>she actually keeps.
            </h1>
            <p className="font-serif italic text-xl md:text-2xl text-jp-deep/80 max-w-xl leading-relaxed">
              We arrange premium handcrafted jewelry and luxury fashion accessories into breathtaking gift bouquets that bloom forever.
            </p>
          </div>
          <div className="relative h-[50vh] lg:h-auto order-1 lg:order-2 overflow-hidden bg-jp-blush/10">
            <img 
              src={product1} 
              alt="JewelPetal signature jewelry gift bouquet styling" 
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </section>

        {/* The Philosophy: Split Section */}
        <section className="py-32 px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center bg-jp-pearl">
          <div className="max-w-xl lg:ml-auto">
            <span className="text-xs uppercase tracking-widest text-jp-rosegold block mb-8 font-sans">Our Philosophy</span>
            <h2 className="font-serif text-3xl md:text-5xl text-jp-plum mb-10 leading-tight">
              Why settle for flowers that wilt in three days?
            </h2>
            <div className="text-lg text-jp-deep/80 space-y-8 leading-relaxed">
              <p>
                Every year, millions of bouquets of fresh-cut flowers are gifted, admired briefly, and thrown away. We asked ourselves: what if a gift could capture that exact same magic, romance, and artistic styling—but remain functional and beloved for years?
              </p>
              <p>
                JewelPetal is the answer. We design luxurious arrangements where every &ldquo;petal&rdquo; is a handpicked accessory—sparkling earrings, premium hair clips, dainty bracelets, custom press-on nails, and beauty items. Beautifully styled as a bouquet, and fully ready to be worn.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] bg-jp-blush/10 overflow-hidden rounded-sm">
            <img 
              src={product2} 
              alt="Handcrafting jewelry and accessory arrangements in India" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
            />
          </div>
        </section>

        {/* The Founder: E-E-A-T Section */}
        <section className="py-32 px-6 md:px-20 bg-jp-blush/10">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-12 mb-12">
              <span className="text-xs uppercase tracking-widest text-jp-rosegold block mb-6 font-sans">The Founder</span>
            </div>
            <div className="lg:col-span-6 order-2 lg:order-1">
              <h2 className="font-serif text-3xl md:text-4xl text-jp-plum mb-8 italic">
                &ldquo;A celebration deserves a memory you can wear.&rdquo;
              </h2>
              <div className="text-base text-jp-deep/75 space-y-6 leading-relaxed">
                <p>
                  Nancy Gupta founded JewelPetal in India to solve a common gifting dilemma: how to send a luxury floral gesture that carries genuine utility and longevity. With a deep passion for accessory curation and premium packaging design, she reimagined the traditional bouquet.
                </p>
                <p>
                  Every JewelPetal collection is designed, hand-styled, and carefully wrapped in our studio. We believe in providing premium jewelry that is completely hypoallergenic, beautifully finished, and styled with perfect color coordination to guarantee that awe-inspiring unboxing moment.
                </p>
              </div>
              <p className="mt-12 font-serif text-xl text-jp-plum">
                Nancy Gupta<br/>
                <span className="text-xs tracking-widest text-jp-rosegold font-sans uppercase">Founder &amp; Creative Director</span>
              </p>
            </div>
            <div className="lg:col-span-6 aspect-square bg-jp-rosegold/5 relative overflow-hidden order-1 lg:order-2 rounded-sm shadow-sm">
              <img 
                src={product1} 
                alt="Nancy Gupta arranging luxury gift bouquets" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Strategic Model: The Collections */}
        <section className="py-32 px-6 md:px-20 bg-jp-pearl">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs uppercase tracking-widest text-jp-rosegold block mb-10 font-sans">The Curated Standard</span>
            <h2 className="font-serif text-3xl md:text-5xl text-jp-plum mb-12 leading-tight">
              Designed for every ritual, big or small.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left mt-20">
              <div className="p-10 bg-jp-blush/20 border-t-2 border-jp-rosegold">
                <span className="text-xs uppercase tracking-widest text-jp-rosegold block mb-6 font-sans">Signature Collections</span>
                <h3 className="font-serif text-2xl text-jp-plum mb-4">Our Curated Classics</h3>
                <p className="text-sm text-jp-deep/75 leading-relaxed">
                  Beautifully coordinated palettes like The Blush Romance or Velvet Noir Bouquet, designed around specific themes and ready to ship.
                </p>
              </div>
              <div className="p-10 border border-jp-blush bg-jp-pearl/50">
                <span className="text-xs uppercase tracking-widest text-jp-plum block mb-6 font-sans">Custom Bouquets</span>
                <h3 className="font-serif text-2xl text-jp-plum mb-4">Made For Her</h3>
                <p className="text-sm text-jp-deep/75 leading-relaxed">
                  Choose her favorite accessory types, metal tones, and style profiles to let our team hand-build a truly bespoke bouquet.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Global CTA */}
        <section className="py-32 px-6 bg-jp-plum text-center text-jp-pearl">
          <div className="max-w-3xl mx-auto">
            <p className="font-serif italic text-2xl md:text-4xl text-jp-blush mb-12 leading-relaxed">
              Give a bouquet she will keep forever.
            </p>
            <a 
              href="/#the-edit" 
              className="inline-block bg-jp-pearl text-jp-plum text-xs uppercase tracking-widest px-12 py-5 hover:bg-jp-rosegold hover:text-jp-pearl transition-all duration-300 rounded-sm font-sans"
            >
              Shop Curated Bouquets
            </a>
          </div>
        </section>

        {/* Related Navigation */}
        <article className="max-w-[1200px] mx-auto px-6 md:px-20 py-20 border-t border-jp-blush">
          <section>
            <span className="text-xs uppercase tracking-widest text-jp-deep/40 block mb-10 font-sans">Discover More</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-jp-plum font-serif text-lg">
              <a href="/our-story" className="hover:text-jp-rosegold transition-all py-2 border-b border-jp-blush">Our Story</a>
              <a href="/how-we-make-it" className="hover:text-jp-rosegold transition-all py-2 border-b border-jp-blush">How We Make It</a>
              <a href="/faq" className="hover:text-jp-rosegold transition-all py-2 border-b border-jp-blush">Gifting FAQ</a>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default About;
