import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import DropIntro from "@/components/sections/DropIntro";
import CollectionsGrid from "@/components/sections/CollectionsGrid";
import FeaturedProduct from "@/components/sections/FeaturedProduct";
import RitualsStrip from "@/components/sections/RitualsStrip";
import BrandStatement from "@/components/sections/BrandStatement";
import InstagramGrid from "@/components/sections/InstagramGrid";
import { ProductGrid } from "@/features/products";
import Footer from "@/components/layout/Footer";
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <div className="min-h-screen bg-jp-pearl selection:bg-jp-rosegold selection:text-jp-pearl">
      <Helmet>
        <title>JewelPetal — Jewelry Gift Bouquets, Made in India</title>
        <meta name="description" content="Shop handcrafted jewelry & accessory gift bouquets at JewelPetal. Earrings, hair clips, bracelets & more — styled as a bouquet. Perfect birthday, anniversary & baby shower gifts for her." />
        <link rel="canonical" href="https://jewelpetal.in" />
        <meta property="og:title" content="JewelPetal — Jewelry Gift Bouquets" />
        <meta property="og:description" content="Give her a bouquet she actually keeps. Handcrafted jewelry & accessory gift bouquets from India." />
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "JewelPetal",
            "url": "https://jewelpetal.in",
            "logo": "https://jewelpetal.in/logo.webp",
            "slogan": "The bouquet she actually keeps.",
            "description": "Shop premium jewelry and fashion accessory gift bouquets at JewelPetal. Arranged to stun, designed to be worn — including earrings, hair clips, necklaces, nail kits, and beauty accessories hand-styled in gift bouquet packaging.",
            "foundingDate": "2026",
            "foundingLocation": {
              "@type": "Place",
              "name": "India"
            },
            "founder": { 
              "@type": "Person", 
              "name": "Nancy Gupta" 
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "guptanancy1249@gmail.com",
              "contactType": "customer service"
            },
            "sameAs": [
              "https://www.instagram.com/jewelpetal.in"
            ]
          }
          `}
        </script>
      </Helmet>
      
      <Navbar />
      <Hero />
      
      <DropIntro />
      <CollectionsGrid />
      <FeaturedProduct />
      <RitualsStrip />
      <BrandStatement />
      <ProductGrid />
      <InstagramGrid />
      <Footer />
    </div>
  );
};

export default Index;
