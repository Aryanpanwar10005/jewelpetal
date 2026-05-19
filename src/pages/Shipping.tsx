import { Helmet } from 'react-helmet-async';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import product1 from '@/assets/images/product-std-7.png';
import product2 from '@/assets/images/product-premium.png';
import { Link } from 'react-router-dom';

const Shipping = () => {
  const scrollIntoView = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const logisticsData = {
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
      "name": "Logistics & Care",
      "item": "https://jewelpetal.in/shipping"
    }]
  };

  return (
    <div className="min-h-screen bg-jp-pearl text-jp-deep font-sans selection:bg-jp-rosegold selection:text-jp-pearl">
      <Helmet>
        <title>Logistics &amp; Care — JewelPetal | Gift Bouquet Shipping</title>
        <meta name="description" content="Notes on JewelPetal's signature unboxing ritual, custom safe-shipping boxes, delivery schedules across India, and accessory care details." />
        <link rel="canonical" href="https://jewelpetal.in/shipping" />
        <script type="application/ld+json">
          {JSON.stringify(logisticsData)}
        </script>
      </Helmet>

      <Navbar />

      <main>
        {/* Full-Bleed Logistics Hero */}
        <section className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center bg-jp-plum">
          <div className="absolute inset-0">
            <img 
              src={product1} 
              alt="JewelPetal custom shipping preparation" 
              className="w-full h-full object-cover brightness-[0.7]"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-jp-plum via-transparent to-black/30" />
          </div>
          <div className="relative z-10 text-center px-6">
            <nav className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-jp-pearl/80 mb-12 animate-fade-in relative z-20 font-sans">
              <Link to="/" className="hover:text-jp-rosegold transition-colors">Home</Link>
              <span className="opacity-40">/</span>
              <span>Logistics</span>
            </nav>
            <h1 className="font-serif text-4xl md:text-7xl text-jp-pearl leading-tight max-w-4xl mx-auto">
              Getting it to Her
            </h1>
          </div>
        </section>

        {/* The Direct Answer / Intro */}
        <section className="py-24 px-6 md:px-20 bg-jp-pearl border-b border-jp-blush text-center">
          <div className="max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-jp-rosegold block mb-8 font-sans">The Unboxing Standard</span>
            <p className="font-serif italic text-xl md:text-2xl text-jp-plum leading-relaxed mb-12">
              Every arrangement is shipped inside our proprietary protective box. A meticulously structured unboxing, ensuring she feels completely adored from the first second.
            </p>
            <div className="h-[2px] w-12 bg-jp-rosegold mx-auto" />
          </div>
        </section>

        <section className="max-w-[1400px] mx-auto px-6 md:px-20 py-24 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-20">
          {/* Minimalist Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-10 font-sans text-xs uppercase tracking-widest">
              <span className="text-jp-rosegold block pb-4 border-b border-jp-blush">Index</span>
              <nav className="flex flex-col space-y-4 font-medium">
                {[
                  { label: 'Shipping Times', id: 'shipping' },
                  { label: 'Unboxing Ritual', id: 'packaging' },
                  { label: 'Returns Policy', id: 'returns' }
                ].map(item => (
                  <button 
                    key={item.id}
                    onClick={() => scrollIntoView(item.id)}
                    className="text-jp-deep/60 hover:text-jp-plum transition-colors text-left"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Logistics Content */}
          <div className="space-y-40 lg:pl-20 lg:border-l lg:border-jp-blush">
            
            {/* Shipping Times */}
            <div id="shipping" className="scroll-mt-32">
              <span className="text-xs uppercase tracking-widest text-jp-rosegold block mb-6 font-sans">01. Delivery Timelines</span>
              <h2 className="font-serif text-3xl md:text-4xl text-jp-plum mb-12">Shipping &amp; Transit</h2>
              <div className="max-w-3xl space-y-8 text-base text-jp-deep/75 leading-relaxed mb-16">
                <p>
                  All JewelPetal orders are packaged with intense care and shipped from our studio in India. We hand-assemble bouquets within 1-2 business days before dispatching them to our reliable express courier partners.
                </p>
              </div>

              <div className="border-t border-jp-blush">
                {[
                  { region: 'Standard India Shipping', time: '4–6 Business Days', note: 'Complimentary shipping on all prepaid orders.' },
                  { region: 'Express India Shipping', time: '2–3 Business Days', note: 'Calculated and added at checkout for priority shipping.' },
                  { region: 'Studio Pickups & Special Curation', time: '1–2 Business Days', note: 'Coordinate custom time slots directly with our team.' }
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-8 py-10 border-b border-jp-blush items-baseline group">
                    <div className="md:col-span-4 font-serif text-xl text-jp-plum group-hover:text-jp-rosegold transition-colors">{row.region}</div>
                    <div className="md:col-span-3 text-sm text-jp-rosegold font-sans uppercase tracking-widest font-semibold">{row.time}</div>
                    <div className="md:col-span-5 text-sm text-jp-deep/60">{row.note}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Packaging Narrative */}
            <div id="packaging" className="scroll-mt-32">
              <span className="text-xs uppercase tracking-widest text-jp-rosegold block mb-6 font-sans">02. The Presentation Ritual</span>
              <h2 className="font-serif text-3xl md:text-4xl text-jp-plum mb-12">Proprietary Gift Boxing</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8 text-base text-jp-deep/75 leading-relaxed">
                  <p>
                    Standard bouquets are fragile, get crushed, and wither. We solved this by developing our double-layered rigid cardboard unboxing vault.
                  </p>
                  <p>
                    Inside, the bouquet is safely suspended and anchored. We finish each box with elegant tissue wrapping sheets, standard satin ribbons, a customized hand-calligraphed note card, and a classic hot rose-wax seal.
                  </p>
                </div>
                <div className="aspect-square bg-jp-blush/10 overflow-hidden rounded-sm shadow-sm">
                  <img src={product2} alt="Proprietary JewelPetal luxury unboxing arrangement" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Returns */}
            <div id="returns" className="scroll-mt-32">
              <span className="text-xs uppercase tracking-widest text-jp-rosegold block mb-6 font-sans">03. Peace of Mind</span>
              <h2 className="font-serif text-3xl md:text-4xl text-jp-plum mb-12">Exchange Policy</h2>
              <div className="max-w-3xl space-y-10 text-base text-jp-deep/75 leading-relaxed mb-16">
                <p>
                  Due to the personal, hygienic nature of jewelry, earrings, hair clips, and press-on nail sets, we are unable to accept returns on unboxed bouquets.
                </p>
                <p>
                  However, customer delight is our absolute priority. If any accessory in your bouquet is damaged or defective during shipping, please contact us immediately, and we will send a priority replacement bloom right away.
                </p>
                <div className="bg-jp-blush/20 p-12 space-y-6 border border-jp-blush relative overflow-hidden group rounded-sm">
                  <span className="text-xs uppercase tracking-widest text-jp-rosegold block font-sans font-medium">How to request an exchange</span>
                  <p className="text-jp-plum">
                    Please send a video or photo of the damaged piece within 48 hours of delivery to **guptanancy1249@gmail.com** with your order number. Our team will resolve it within 24 hours.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Global Help CTA */}
        <section className="py-32 px-6 bg-jp-plum text-center text-jp-pearl">
          <div className="max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-jp-blush block mb-10 font-sans">Further Logistics Inquiries</span>
            <p className="font-serif italic text-2xl md:text-4xl mb-12 leading-relaxed">
              Our studio team is always here to track, coordinate, or customize your shipping.
            </p>
            <a 
              href="mailto:guptanancy1249@gmail.com" 
              className="inline-block text-xs uppercase tracking-widest border-b border-jp-blush py-2 hover:text-jp-blush transition-all font-sans font-semibold"
            >
              guptanancy1249@gmail.com
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Shipping;
