import { useState, useEffect, useRef } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CartDrawer } from '@/features/cart';
import { storefrontApiRequest, PRODUCTS_QUERY, ShopifyProduct } from '@/lib/shopify';
import posthog from 'posthog-js';

const Navbar = () => {
  const { pathname } = useLocation();
  const hasDarkHero = ['/', '/our-story', '/how-we-make-it', '/shipping', '/gift-guide'].includes(pathname);
  const [isScrolled, setIsScrolled] = useState(false);
  const showScrolledState = isScrolled || !hasDarkHero;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ShopifyProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [searchOpen]);

  // Lock body scroll when mobile menu or search is open
  useEffect(() => {
    document.body.style.overflow = (mobileMenuOpen || searchOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen, searchOpen]);

  // Debounced search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const data = await storefrontApiRequest(PRODUCTS_QUERY, {
          first: 10,
          query: searchQuery,
        });
        if (data?.data?.products?.edges) {
          setSearchResults(data.data.products.edges);
          // --- GEO/Tracking (Search Used) ---
          posthog.capture('search_used', {
            query: searchQuery,
            results_count: data.data.products.edges.length
          });
        }
      } catch (e) {
        console.error('Search failed:', e);
      } finally {
        setIsSearching(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleResultClick = (handle: string) => {
    setSearchOpen(false);
    setMobileMenuOpen(false);
    navigate(`/product/${handle}`);
  };

  const navItems = [
    { label: 'Bouquets', href: '/#collection-01' },
    { label: 'Our Story', href: '/our-story' },
    { label: 'Custom Order', href: '/contact' },
    { label: 'Gift Guide', href: '/gift-guide' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.replace('/#', '');
      if (window.location.pathname === '/') {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(href);
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b border-transparent",
          showScrolledState ? "bg-jp-pearl/90 backdrop-blur-md py-4 border-jp-dust/20" : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Left: Brand */}
          <Link
            to="/"
            className={cn(
              "font-serif font-bold text-2xl transition-colors tracking-wide",
              showScrolledState ? "text-jp-deep hover:text-jp-rosegold" : "text-jp-pearl hover:text-jp-petal"
            )}
          >
            JewelPetal
          </Link>

          {/* Center: Navigation - Desktop */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  "group relative font-sans text-[11px] uppercase tracking-[0.15em] transition-colors font-medium",
                  showScrolledState ? "text-jp-deep hover:text-jp-rosegold" : "text-jp-pearl hover:text-jp-petal"
                )}
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-jp-rosegold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => { setSearchOpen(true); setMobileMenuOpen(false); }}
              className={cn(
                "transition-colors",
                showScrolledState ? "text-jp-deep hover:text-jp-rosegold" : "text-jp-pearl hover:text-jp-petal"
              )}
              aria-label="search"
            >
              <Search className="w-4 h-4" />
            </button>
            <CartDrawer className={showScrolledState ? "text-jp-deep" : "text-jp-pearl"} />
            <button
              onClick={() => { setMobileMenuOpen(!mobileMenuOpen); setSearchOpen(false); }}
              className={cn(
                "lg:hidden transition-colors",
                showScrolledState ? "text-jp-deep hover:text-jp-rosegold" : "text-jp-pearl hover:text-jp-petal"
              )}
              aria-label="menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-jp-deep/40" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-0 right-0 w-[80vw] max-w-sm h-full bg-jp-pearl shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex justify-end p-6">
              <button onClick={() => setMobileMenuOpen(false)} className="text-jp-deep hover:text-jp-rosegold transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="px-8 space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block font-sans text-sm uppercase tracking-[0.15em] text-jp-deep hover:text-jp-rosegold transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-jp-pearl/95 backdrop-blur-sm" onClick={() => setSearchOpen(false)} />
          <div className="relative z-10 container mx-auto px-6 pt-24 max-w-2xl">
            {/* Close */}
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-6 right-6 text-jp-deep hover:text-jp-rosegold transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Search input */}
            <div className="border-b border-jp-deep/20 pb-4 mb-8">
              <div className="flex items-center gap-4">
                <Search className="w-5 h-5 text-jp-charcoal/40 flex-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search bouquets..."
                  className="w-full bg-transparent font-serif text-2xl text-jp-deep placeholder:text-jp-charcoal/30 outline-none"
                />
              </div>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {isSearching && (
                <p className="font-sans text-sm text-jp-charcoal/50 italic">searching...</p>
              )}
              {!isSearching && searchQuery && searchResults.length === 0 && (
                <p className="font-sans text-sm text-jp-charcoal/50 italic">no results for "{searchQuery}"</p>
              )}
              {searchResults.map((product) => {
                const image = product.node.images.edges[0]?.node;
                const price = product.node.priceRange.minVariantPrice;
                return (
                  <button
                    key={product.node.id}
                    onClick={() => handleResultClick(product.node.handle)}
                    className="w-full flex items-center gap-4 py-4 border-b border-jp-dust/20 hover:bg-jp-cream/10 transition-colors text-left"
                  >
                    <div className="w-16 h-16 flex-none overflow-hidden bg-jp-cream/10">
                      {image && (
                        <img src={image.url} alt={image.altText || product.node.title} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm text-jp-deep truncate">{product.node.title}</h4>
                      <p className="font-sans text-xs text-jp-rosegold mt-1">
                        {price.currencyCode === 'INR' ? '₹' : price.currencyCode} {parseFloat(price.amount).toLocaleString()}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
