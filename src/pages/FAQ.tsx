import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';

const faqData = [
  {
    category: "01 — About the Bouquets.",
    title: "The Bouquet Concept",
    id: "about",
    items: [
      {
        q: "What is JewelPetal?",
        qLowercase: "what is jewelpetal?",
        a: "JewelPetal is India's pioneer in luxury handcrafted jewelry and fashion accessory gift bouquets. We curate premium hypoallergenic jewelry, hair accessories, and nails, hand-styling them into breathtaking floral-style arrangements. It is a stunning, premium alternative to traditional flowers, designed to stun and built to last."
      },
      {
        q: "Are the flowers real? How does it work?",
        qLowercase: "are the flowers real? how does it work?",
        a: "No, there are no live flowers that wilt. Every single 'bloom' or 'petal' in a JewelPetal arrangement is a high-quality fashion accessory or jewelry piece. We mount earrings, bracelets, hair clips, scrunchies, and custom nails onto non-abrasive stems, wrapping them in premium layers to look exactly like a luxurious floral bouquet."
      },
      {
        q: "Can the jewelry actually be worn?",
        qLowercase: "can the jewelry actually be worn?",
        a: "Absolutely! Every item is fully functional, safe, and easy to detach. The bouquet structure is designed to hold the accessories securely for presentation, but they are made to be worn and enjoyed for years to come. In fact, our bouquets double as beautiful vanity or dresser decor before they are fully unboxed."
      }
    ]
  },
  {
    category: "02 — Curation & Craft.",
    title: "Materials & Customization",
    id: "curation",
    items: [
      {
        q: "What materials do you use in your jewelry?",
        qLowercase: "what materials do you use in your jewelry?",
        a: "We prioritize comfort and quality. All JewelPetal jewelry pieces are made from premium hypoallergenic brass, sterling silver, or high-grade anti-tarnish alloys. We use high-lustre freshwater pearls, premium zirconia, and skin-safe coatings to ensure they are comfortable for sensitive skin and suitable for all-day wear."
      },
      {
        q: "Can I customize a bouquet for a specific person?",
        qLowercase: "can i customize a bouquet for a specific person?",
        a: "Yes! Our signature service is Custom Bouquet Curation. You can share her style preferences (e.g. gold vs silver, minimalist vs statement), favorite accessory types, or ring sizes, and our styling team will hand-build a bespoke bouquet wrapped in your choice of color palette."
      },
      {
        q: "Does it come with a personalized gift note?",
        qLowercase: "does it come with a personalized gift note?",
        a: "Every JewelPetal order includes a premium gift card with a complimentary handwritten calligraphy note of your choice, elegantly sealed in our signature rose-wax stamp to guarantee a beautiful personal touch."
      }
    ]
  },
  {
    category: "03 — Ordering & Gifting.",
    title: "How to Gift",
    id: "ordering",
    items: [
      {
        q: "How do I place an order?",
        qLowercase: "how do i place an order?",
        a: "Simply browse our collections at jewelpetal.in, select your signature bouquet (or request a custom curation), enter your gift message, and check out. You will receive an instant order confirmation email with your details."
      },
      {
        q: "What payment methods are accepted?",
        qLowercase: "what payment methods are accepted?",
        a: "We accept all major credit and debit cards, UPI, Google Pay, PhonePe, and Net Banking. All transactions are securely processed via encrypted checkout portals."
      }
    ]
  },
  {
    category: "04 — Shipping & Care.",
    title: "Delivery & Unboxing",
    id: "shipping",
    items: [
      {
        q: "How long does shipping take?",
        qLowercase: "how long does shipping take?",
        a: "Within India, standard shipping takes 4 to 6 business days. Express shipping options are available at checkout for 2 to 3 business days delivery. Once dispatched, you will receive a tracking link via email and WhatsApp."
      },
      {
        q: "How are the bouquets shipped so they don't get damaged?",
        qLowercase: "how are the bouquets shipped so they don't get damaged?",
        a: "We have designed custom, heavy-duty JewelPetal shipping boxes with specialized protective inserts. The bouquet is locked in place inside the box, ensuring that no wrapping folds are crushed and all accessory stems remain completely intact during transit."
      }
    ]
  }
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (q: string) => {
    setOpenItems(prev => 
      prev.includes(q) ? prev.filter(item => item !== q) : [...prev, q]
    );
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.flatMap(section => 
      section.items.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    )
  };

  return (
    <div className="min-h-screen bg-jp-pearl text-jp-deep font-sans selection:bg-jp-rosegold selection:text-jp-pearl">
      <Helmet>
        <title>Frequently Asked Questions — JewelPetal Concierge</title>
        <meta name="description" content="Support and answers for JewelPetal. Shipping, customization, returns, anti-tarnish jewelry, and packaging details for our premium accessory gift bouquets." />
        <link rel="canonical" href="https://jewelpetal.in/faq" />
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
                "name": "FAQ",
                "item": "https://jewelpetal.in/faq"
              }]
            },
            schemaData
          ])}
        </script>
      </Helmet>

      <Navbar />

      <main>
        {/* Elegant Header */}
        <section className="px-6 md:px-20 py-24 bg-jp-pearl border-b border-jp-blush text-center">
          <nav className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-jp-plum/60 mb-10 font-sans">
            <Link to="/" className="hover:text-jp-rosegold transition-colors">Home</Link>
            <span className="opacity-40">/</span>
            <span>Frequently Asked</span>
          </nav>
          <h1 className="font-serif text-4xl md:text-7xl text-jp-plum leading-tight mb-8">
            Concierge
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-jp-deep/60 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about gifting our handcrafted accessory &amp; jewelry bouquets.
          </p>
        </section>

        <section className="max-w-[1400px] mx-auto px-6 md:px-20 py-24 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-20">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-8">
              <span className="text-xs uppercase tracking-widest text-jp-rosegold block pb-4 border-b border-jp-blush font-sans">Index</span>
              <nav className="flex flex-col space-y-4 font-sans text-xs uppercase tracking-widest">
                {faqData.map(section => (
                  <a 
                    key={section.id}
                    href={`#${section.id}`}
                    className="text-jp-deep/60 hover:text-jp-plum transition-colors py-1"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* FAQ Sections */}
          <div className="space-y-32 lg:pl-20 lg:border-l lg:border-jp-blush">
            {faqData.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-32">
                <header className="mb-12">
                  <span className="text-xs uppercase tracking-widest text-jp-rosegold block mb-6 font-sans">{section.category}</span>
                  <h2 className="font-serif text-3xl md:text-4xl text-jp-plum leading-tight">
                    {section.title}
                  </h2>
                </header>

                <div className="space-y-0 border-t border-jp-blush">
                  {section.items.map((item) => (
                    <div key={item.q} className="border-b border-jp-blush group">
                      <button 
                        onClick={() => toggleItem(item.q)}
                        className="w-full py-10 flex justify-between items-center gap-8 text-left"
                        aria-expanded={openItems.includes(item.q)}
                      >
                        <h3 className="font-serif text-xl md:text-2xl text-jp-deep group-hover:text-jp-plum transition-colors">
                          {item.q}
                        </h3>
                        <div className="flex-shrink-0 w-6 h-6 relative text-jp-rosegold">
                          <span className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${openItems.includes(item.q) ? 'rotate-180' : ''}`}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 4L6 9L11 4" stroke="currentColor" strokeWidth="1" />
                            </svg>
                          </span>
                        </div>
                      </button>
                      <div className={`overflow-hidden transition-all duration-700 ease-out ${openItems.includes(item.q) ? 'max-h-[500px] mb-12 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="max-w-3xl pr-12">
                          <p className="text-base text-jp-deep/75 leading-relaxed font-sans mb-8">
                            {item.a}
                          </p>
                          <div className="h-[2px] w-12 bg-jp-rosegold mb-8" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Concierge Help Box */}
            <div className="bg-jp-blush/20 p-16 border border-jp-blush relative overflow-hidden group rounded-sm">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60 10V110M10 60H110" stroke="#181717" strokeWidth="0.5" />
                </svg>
              </div>
              <div className="relative z-10">
                <span className="text-xs uppercase tracking-widest text-jp-rosegold block mb-8 font-sans">Personal Assistance</span>
                <h3 className="font-serif text-2xl md:text-3xl text-jp-plum mb-6">Still have questions?</h3>
                <p className="text-base text-jp-deep/75 mb-10 max-w-xl">Our client service team is here to assist. We respond to all inquiries within 24 hours of landing in our inbox.</p>
                <a 
                  href="mailto:guptanancy1249@gmail.com" 
                  className="inline-block text-xs uppercase tracking-widest text-jp-plum border-b border-jp-rosegold py-2 hover:text-jp-rosegold transition-all font-sans font-medium"
                >
                  guptanancy1249@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Global CTA */}
        <section className="py-32 px-6 bg-jp-pearl text-center border-t border-jp-blush">
          <div className="max-w-3xl mx-auto">
            <p className="font-serif italic text-2xl md:text-3xl text-jp-plum mb-12 leading-relaxed">
              Find her perfect match today.
            </p>
            <Link 
              to="/#the-edit" 
              className="inline-block bg-jp-plum text-jp-pearl text-xs uppercase tracking-widest px-12 py-5 hover:bg-jp-rosegold transition-all duration-300 rounded-sm font-sans"
            >
              Shop Bouquets
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
