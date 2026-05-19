import { useState } from "react";
import posthog from "posthog-js";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      // Calling the local Serverless Proxy (Zero Key Exposure)
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setIsSubscribed(true);
        setEmail("");
        posthog.capture('stay_in_bloom_subscribed');
      } else {
        const errorData = await response.json();
        console.error('Subscription failed:', errorData.error);
        alert('We could not add your email to our newsletter at this time. Please try again later.');
      }
    } catch (err) {
      console.error('Network error during subscription:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const footerLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
    { label: 'Shipping', href: '/shipping' },
    { label: 'Returns', href: '/shipping#returns' },
  ];

  const exploreLinks = [
    { label: 'Our Story', href: '/our-story' },
    { label: 'How We Make It', href: '/how-we-make-it' },
    { label: 'Custom Orders', href: '/contact' },
  ];

  return (
    <footer className="bg-jp-pearl border-t border-jp-dust/20 pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Col */}
          <div className="md:col-span-3">
            <Link
              to="/"
              className="font-serif font-bold text-2xl text-jp-deep mb-6 block tracking-wide"
            >
              JewelPetal
            </Link>
            <p className="font-serif italic text-sm text-jp-charcoal/70 max-w-[240px] leading-relaxed">
              The bouquet she actually keeps. Premium jewelry & fashion accessory gift bouquets handcrafted in India.
            </p>
          </div>

          {/* Stay Elegant (Newsletter) */}
          <div className="md:col-span-4">
            <p className="font-serif italic text-xl text-jp-deep mb-3">Stay Elegant</p>
            <p className="text-[10px] text-jp-charcoal/40 mb-8 uppercase tracking-[0.2em]">
              New bouquets, gift ideas & seasonal drops. Once a month.
            </p>
            
            {isSubscribed ? (
              <p className="font-serif italic text-jp-rosegold text-sm animate-fade-in">
                Thank you. You have been added to our curation list.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-4 max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@domain.com"
                  aria-label="Email for newsletter waitlist"
                  className="flex-1 bg-transparent border-b border-jp-dust/40 pb-3 font-sans text-xs focus:outline-none focus:border-jp-rosegold transition-colors placeholder:text-jp-charcoal/30 text-jp-deep"
                  required
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="text-xs uppercase tracking-[0.3em] text-jp-deep hover:text-jp-rosegold transition-colors py-2 font-medium"
                >
                  {isSubmitting ? 'Joining...' : 'Join'}
                </button>
              </form>
            )}
          </div>

          {/* Links Col */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-jp-rosegold mb-4 font-semibold">Service</p>
            {footerLinks.map((link) => (
              <Link 
                key={link.label} 
                to={link.href} 
                className="text-xs tracking-widest text-jp-charcoal hover:text-jp-rosegold transition-colors w-fit font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Explore Col */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-jp-rosegold mb-4 font-semibold">Explore</p>
            {exploreLinks.map((link) => (
              <Link 
                key={link.label} 
                to={link.href} 
                className="text-xs tracking-widest text-jp-charcoal hover:text-jp-rosegold transition-colors w-fit font-medium"
              >
                {link.label}
              </Link>
            ))}
            <a 
              href="https://www.instagram.com/jewelpetal.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs tracking-widest text-jp-charcoal hover:text-jp-rosegold transition-colors w-fit mt-4 flex items-center gap-1 font-medium"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="text-center pt-12 border-t border-jp-dust/10">
          <p className="font-serif italic text-xs tracking-wider text-jp-rosegold/70">
            © 2026 JewelPetal. All rights reserved. Built with love in India.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
