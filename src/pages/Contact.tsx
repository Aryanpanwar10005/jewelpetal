import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    orderNumber: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formspreeId = import.meta.env.VITE_FORMSPREE_ID;

    if (formspreeId && formspreeId !== 'REPLACE_WITH_FORMSPREE_ID') {
      try {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formState)
        });

        if (response.ok) {
          setIsSubmitted(true);
          setFormState({
            name: '',
            email: '',
            subject: '',
            orderNumber: '',
            message: ''
          });
        } else {
          console.error('Formspree submission failed');
          alert('There was an error sending your message. Please try again later.');
        }
      } catch (err) {
        console.error('Error submitting form:', err);
      }
    } else {
      // Mock submission for development
      console.log('Form submission (mock):', formState);
      console.info('To enable real submissions, set VITE_FORMSPREE_ID in your .env file.');
      setIsSubmitted(true);
      setFormState({
        name: '',
        email: '',
        subject: '',
        orderNumber: '',
        message: ''
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-jp-pearl text-jp-deep font-sans flex flex-col selection:bg-jp-rosegold selection:text-jp-pearl">
      <Helmet>
        <title>Correspondence &amp; Custom Curation — JewelPetal</title>
        <meta name="description" content="Reach Nancy Gupta and the JewelPetal design team. Write to us about orders, personalized bridal bouquets, customized hair accessories, or press inquiries." />
        <link rel="canonical" href="https://jewelpetal.in/contact" />
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
              "name": "Correspondence",
              "item": "https://jewelpetal.in/contact"
            }]
          })}
        </script>
      </Helmet>

      <Navbar />

      <main className="flex-1">
        {/* Minimalist Header */}
        <section className="px-6 md:px-20 py-24 bg-jp-pearl border-b border-jp-blush text-center">
          <nav className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-jp-deep/40 mb-10 font-sans">
            <Link to="/" className="hover:text-jp-rosegold transition-colors">Home</Link>
            <span className="opacity-40">/</span>
            <span>Correspondence</span>
          </nav>
          <h1 className="font-serif text-4xl md:text-7xl text-jp-plum leading-tight mb-8">
            Write to Nancy Gupta
          </h1>
          <p className="font-serif italic text-xl text-jp-deep/70 max-w-2xl mx-auto leading-relaxed">
            For custom jewelry bouquet curations, wedding orders, or styling questions. Our design studio team will happily respond within one business day.
          </p>
        </section>

        <section className="max-w-[1400px] mx-auto px-6 md:px-20 py-24 grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-24">
          
          {/* Studio Context */}
          <div className="space-y-20">
            <div>
              <span className="text-xs uppercase tracking-widest text-jp-rosegold block mb-8 font-sans">Direct Enquiries</span>
              <div className="space-y-12">
                <div>
                  <h2 className="font-serif text-2xl text-jp-plum mb-3">General Inquiries</h2>
                  <p className="text-[15px] text-jp-deep/70 leading-relaxed mb-4">
                    Regarding existing orders, delivery statuses, or accessory selection details.
                  </p>
                  <a href="mailto:guptanancy1249@gmail.com" className="inline-block text-xs uppercase tracking-widest text-jp-plum font-semibold border-b border-jp-rosegold py-1 hover:text-jp-rosegold transition-all font-sans">
                    guptanancy1249@gmail.com
                  </a>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-jp-plum mb-3">Custom Curation &amp; Weddings</h2>
                  <p className="text-[15px] text-jp-deep/70 leading-relaxed mb-4">
                    Planning a bridal bouquet, bridesmaid gifts, or seeking custom flower colors? Let's bring it to life.
                  </p>
                  <a href="mailto:guptanancy1249@gmail.com" className="inline-block text-xs uppercase tracking-widest text-jp-plum font-semibold border-b border-jp-rosegold py-1 hover:text-jp-rosegold transition-all font-sans">
                    guptanancy1249@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-20 border-t border-jp-blush">
              <span className="text-xs uppercase tracking-widest text-jp-rosegold block mb-8 font-sans">Social Index</span>
              <p className="text-[15px] text-jp-deep/70 leading-relaxed mb-6">
                Witness the behind-the-scenes craft, nail set fittings, and beautiful flower arrangements.
              </p>
              <a 
                href="https://www.instagram.com/jewelpetal.in?igsh=MmZsMjVoemtuYW5u" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block text-xs uppercase tracking-widest text-jp-plum font-semibold border-b border-jp-rosegold py-1 hover:text-jp-rosegold transition-all font-sans"
              >
                @jewelpetal.in
              </a>
            </div>

            <div className="bg-jp-blush/20 p-10 border border-jp-blush rounded-sm">
              <p className="text-xs text-jp-deep/50 leading-relaxed italic font-serif">
                Note: Our studio operates Monday through Friday, 10am to 6pm IST. We respect the focus required for handcrafting jewelry arrangements and respond to all inquiries within 24 hours.
              </p>
            </div>
          </div>

          {/* Correspondence Form */}
          <div className="lg:pl-24 lg:border-l lg:border-jp-blush">
            <header className="mb-16">
              <span className="text-xs uppercase tracking-widest text-jp-rosegold block mb-6 font-sans">Send an Inquiry</span>
              <h2 className="font-serif text-3xl md:text-5xl text-jp-plum leading-tight max-w-xl">
                Begin Your Curation
              </h2>
            </header>

            <form onSubmit={handleSubmit} className="space-y-12 max-w-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans">
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-widest text-jp-deep/50 block" htmlFor="name">Your Name</label>
                  <input 
                    className="w-full bg-transparent border-b border-jp-blush py-4 text-base outline-none focus:border-jp-rosegold transition-colors placeholder:text-jp-deep/20"
                    type="text" id="name" required placeholder="Full name" value={formState.name} onChange={handleChange} 
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-widest text-jp-deep/50 block" htmlFor="email">Email Address</label>
                  <input 
                    className="w-full bg-transparent border-b border-jp-blush py-4 text-base outline-none focus:border-jp-rosegold transition-colors placeholder:text-jp-deep/20"
                    type="email" id="email" required placeholder="email@address.com" value={formState.email} onChange={handleChange} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans">
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-widest text-jp-deep/50 block" htmlFor="subject">Subject of Interest</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-transparent border-b border-jp-blush py-4 text-base outline-none focus:border-jp-rosegold transition-colors cursor-pointer appearance-none text-jp-deep/80"
                      id="subject" value={formState.subject} onChange={handleChange}
                    >
                      <option value="">Select a Topic</option>
                      <option>Order Enquiry</option>
                      <option>Custom Bouquet Curation</option>
                      <option>Press &amp; Collaborations</option>
                      <option>Exchanges &amp; Replacements</option>
                      <option>Something Else</option>
                    </select>
                    <div className="absolute right-0 bottom-4 pointer-events-none opacity-40">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-widest text-jp-deep/50 block" htmlFor="orderNumber">Order Number</label>
                  <input 
                    className="w-full bg-transparent border-b border-jp-blush py-4 text-base outline-none focus:border-jp-rosegold transition-colors placeholder:text-jp-deep/20"
                    type="text" id="orderNumber" placeholder="If applicable" value={formState.orderNumber} onChange={handleChange} 
                  />
                </div>
              </div>

              <div className="space-y-3 font-sans">
                <label className="text-xs uppercase tracking-widest text-jp-deep/50 block" htmlFor="message">Your Message</label>
                <textarea 
                  className="w-full bg-transparent border-b border-jp-blush py-4 text-base min-h-[120px] outline-none focus:border-jp-rosegold transition-colors resize-none placeholder:text-jp-deep/20"
                  id="message" required placeholder="How can Nancy and the team help you?" value={formState.message} onChange={handleChange}
                ></textarea>
              </div>

              <div className="pt-10 flex flex-col items-start gap-8 font-sans">
                <button 
                  type="submit" 
                  className="bg-jp-plum text-jp-pearl px-16 py-5 text-xs uppercase tracking-widest hover:bg-jp-rosegold hover:text-jp-pearl transition-all font-semibold rounded-sm shadow-sm"
                >
                  Send Correspondence
                </button>

                {isSubmitted && (
                  <div className="p-6 bg-jp-blush/20 border border-jp-blush animate-fade-in w-full rounded-sm">
                    <p className="font-serif italic text-jp-plum">Received. We will respond within one business day.</p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
