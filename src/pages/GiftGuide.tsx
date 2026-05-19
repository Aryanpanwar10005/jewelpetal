import { Helmet } from 'react-helmet-async';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import product1 from '@/assets/images/romantic-luxury-flatlay.png';
import product2 from '@/assets/images/product-std-7.png';
import { Link } from 'react-router-dom';

const GiftGuide = () => {
  const guides = [
    { 
      name: "The Blush Birthday Bouquet", 
      desc: "Perfect for birthdays, sweet sixteens, and romantic milestones. Hand-wrapped in soft pastel pink Korean paper and finished with a double French satin bow. Features 18k gold-plated pearl drop earrings, matching pink velvet scrunchies, and a premium reusable blush pink press-on nail set.",
      tag: "Ideal for: Birthdays & Sweet 16s"
    },
    { 
      name: "The Noir Bachelorette Bouquet", 
      desc: "Perfect for bachelorette parties, bridesmaids, and late-night celebrations. Wrapped in heavy noir or rich plum wrap sheets with silver silk ribbon ties. Features chunky anti-tarnish sterling silver hoop earrings, a dainty silver chain link bracelet, and metallic chrome custom nails.",
      tag: "Ideal for: Bridesmaids & Girls' Night Out"
    },
    { 
      name: "The Mommy-to-Be Bouquet", 
      desc: "Perfect for baby showers, gender reveals, and cozy family milestones. Styled in soft cream-ivory wrapping paper with warm gold detailing. Features lightweight hypoallergenic rose gold stud earrings, a soft organic cotton hair band, and luxurious custom hand creams.",
      tag: "Ideal for: Baby Showers & New Moms"
    }
  ];

  return (
    <div className="min-h-screen bg-jp-pearl text-jp-deep font-sans selection:bg-jp-rosegold selection:text-jp-pearl">
      <Helmet>
        <title>Gift Curation Guide — JewelPetal | Jewelry Bouquet Occasions India</title>
        <meta name="description" content="Find the perfect jewelry gift bouquet for her. Discover how to match JewelPetal's coordinated accessory arrangements to birthdays, bachelorettes, baby showers, or anniversaries." />
        <link rel="canonical" href="https://jewelpetal.in/gift-guide" />
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
              "name": "Gift Curation Guide",
              "item": "https://jewelpetal.in/gift-guide"
            }]
          }
          `}
        </script>
      </Helmet>

      <Navbar />

      <main>
        {/* Full-Bleed Section */}
        <section className="relative h-[70vh] w-full overflow-hidden flex items-center justify-center bg-jp-plum">
          <div className="absolute inset-0">
            <img 
              src={product1} 
              alt="Beautifully prepared jewelry gift bouquets for gifting occasions" 
              className="w-full h-full object-cover brightness-[0.7]"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-jp-plum via-transparent to-black/30" />
          </div>
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <nav className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-jp-pearl/80 mb-10 font-sans">
              <Link to="/" className="hover:text-jp-rosegold transition-colors">Home</Link>
              <span className="opacity-40">/</span>
              <span>Gift Guide</span>
            </nav>
            <h1 className="font-serif text-4xl md:text-7xl text-jp-pearl leading-none mb-10">
              The Art of Everlasting Gifting
            </h1>
            <p className="font-serif italic text-xl md:text-2xl text-jp-blush max-w-2xl mx-auto leading-relaxed">
              Find the perfect bouquet profile styled for her unique personality and life&apos;s special rituals.
            </p>
          </div>
        </section>

        {/* The Landscape Grid */}
        <section className="py-32 px-6 md:px-20 bg-jp-pearl">
          <div className="max-w-[1200px] mx-auto">
            <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-xl">
                <span className="text-xs uppercase tracking-widest text-jp-rosegold block mb-6 font-sans">Curation Pairing</span>
                <h2 className="font-serif text-3xl md:text-5xl text-jp-plum leading-tight">
                  Match her personality to a custom arrangement.
                </h2>
              </div>
              <div className="text-xs tracking-widest text-jp-deep/40 font-sans uppercase">
                Occasion Guide / 2026
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {guides.map((guide, index) => (
                <div key={guide.name} className="bg-jp-pearl p-12 hover:bg-jp-blush/20 border border-jp-blush transition-colors group relative overflow-hidden rounded-sm">
                  <div className="absolute top-0 right-0 p-6 text-5xl font-serif opacity-5 group-hover:opacity-10 group-hover:text-jp-rosegold transition-all">
                    0{index + 1}
                  </div>
                  <h3 className="font-serif text-2xl text-jp-plum mb-6 group-hover:text-jp-rosegold transition-colors">
                    {guide.name}
                  </h3>
                  <div className="space-y-6">
                    <p className="text-sm text-jp-deep/80 leading-relaxed">
                      {guide.desc}
                    </p>
                    <div className="pt-6 border-t border-jp-blush">
                      <span className="text-xs tracking-widest text-jp-rosegold uppercase font-sans font-medium">
                        {guide.tag}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Difference Split */}
        <section className="py-32 px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center bg-jp-blush/10">
          <div className="relative aspect-[4/5] bg-jp-rosegold/5 overflow-hidden rounded-sm shadow-sm">
            <img 
              src={product2} 
              alt="Nancy Gupta's custom accessory selections" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
            />
          </div>
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-widest text-jp-rosegold block mb-8 font-sans">The Custom Touch</span>
            <h2 className="font-serif text-3xl md:text-5xl text-jp-plum mb-10 leading-tight">
              Create a bespoke bouquet designed specifically for her.
            </h2>
            <div className="text-lg text-jp-deep/80 space-y-8 leading-relaxed">
              <p>
                Don&apos;t see the perfect match? Our signature service is Custom Bouquet Curation. You tell us her jewelry preferences (e.g. gold vs silver, minimalist vs statement), her favorite hair styles, and we wrap a bespoke bundle from scratch.
              </p>
              <p>
                Every custom arrangement includes a complimentary, handwritten calligraphy gift note sealed with premium rose-wax.
              </p>
            </div>
            <a 
              href="/our-story" 
              className="inline-block mt-12 text-xs tracking-widest uppercase text-jp-plum border-b border-jp-rosegold py-2 hover:text-jp-rosegold transition-all font-sans"
            >
              Learn about our brand values
            </a>
          </div>
        </section>

        {/* Global CTA */}
        <section className="py-32 px-6 bg-jp-pearl text-center">
          <div className="max-w-3xl mx-auto">
            <p className="font-serif italic text-2xl md:text-4xl text-jp-plum mb-12 leading-relaxed">
              Start building your custom gift bouquet today.
            </p>
            <a 
              href="/#the-edit" 
              className="inline-block bg-jp-plum text-jp-pearl text-xs uppercase tracking-widest px-12 py-5 hover:bg-jp-rosegold transition-all duration-300 rounded-sm font-sans"
            >
              Begin Curation
            </a>
          </div>
        </section>

        {/* Related Navigation */}
        <article className="max-w-[1200px] mx-auto px-6 md:px-20 py-20 border-t border-jp-blush">
          <section>
            <span className="text-xs uppercase tracking-widest text-jp-deep/40 block mb-10 font-sans font-medium">Discover More</span>
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

export default GiftGuide;
