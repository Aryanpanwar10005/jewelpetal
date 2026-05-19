# 💎 JewelPetal

**The bouquet she actually keeps.**

JewelPetal is a premium handcrafted gifting brand from India — creating jewelry & fashion accessory gift bouquets that replace temporary flowers with beautiful, wearable keepsakes. Each bouquet is hand-styled with real jewelry, hair accessories, and beauty items, wrapped in premium linen and ribbon.

> 🌐 **Live Site:** [jewelpetal.in](https://jewelpetal.in) *(coming soon)*  
> 📸 **Instagram:** [@jewelpetal.in](https://www.instagram.com/jewelpetal.in)

---

## ✨ What is JewelPetal?

Instead of a bouquet of flowers that wilts in three days, JewelPetal customers gift a curated arrangement of:

- 💍 Anti-tarnish earrings, necklaces & bracelets
- 🎀 Velvet scrunchies & premium satin ribbons
- 💅 Acrylic claw clips & boxed press-on nail kits
- 💌 Custom hand-written greeting cards
- 🍫 Add-on chocolates & crochet items (Premium tier)

All arranged in gift bouquet form — designed to stun on the outside, and be worn and cherished for years.

---

## 🛍️ Product Catalogue

| Collection | Price | Items |
|---|---|---|
| **Mini Jewelry Bouquet** | ₹150 – ₹250 | 1–5 handcrafted jewelry items. Perfect for bulk & corporate gifting. |
| **Standard 7-Item Bouquet** | ₹599 | 7 premium jewelry & hair accessories in botanical wraps. |
| **Standard 9-Item Bouquet** | ₹699 | 9 elevated pieces in coordinated pastel linen layers. |
| **Premium Custom Bouquet** | From ₹999 | 10+ items, fully custom. Add chocolates, photos & crochet pieces. |

---

## 🏗️ Tech Stack

This repository contains the complete **headless storefront** for JewelPetal, built as a modern React SPA.

| Layer | Technology |
|---|---|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite 5 (SWC) |
| **Styling** | Tailwind CSS v3 + Custom Design Tokens |
| **UI Primitives** | Radix UI + shadcn/ui |
| **Routing** | React Router DOM v6 |
| **State Management** | Zustand (cart & auth) |
| **Data Fetching** | TanStack React Query v5 |
| **Forms** | React Hook Form + Zod |
| **SEO** | React Helmet Async + JSON-LD Structured Data |
| **Analytics** | PostHog + Vercel Analytics |
| **Error Monitoring** | Sentry React |
| **Hosting** | GitHub Pages (via GitHub Actions) |

---

## 📁 Project Structure

```
jewelpetal/
├── public/
│   ├── favicon.png           # Brand favicon
│   ├── logo.webp             # Optimized brand logo
│   ├── og-image.png          # Open Graph social preview image
│   ├── robots.txt            # AI crawler allowlist (GPTBot, ClaudeBot, PerplexityBot)
│   ├── sitemap.xml           # Full URL sitemap for search indexing
│   ├── llms.txt              # E-E-A-T document for AI search citations
│   └── 404.html             # GitHub Pages SPA routing fallback
│
├── src/
│   ├── components/
│   │   ├── layout/           # Navbar, Footer, NavLink
│   │   ├── sections/         # Hero, CollectionsGrid, FeaturedProduct, etc.
│   │   └── ui/               # shadcn/ui component primitives
│   │
│   ├── features/
│   │   ├── auth/             # Auth store (Zustand)
│   │   ├── cart/             # Cart store + sync hooks
│   │   └── products/         # Mock product data & type definitions
│   │
│   ├── pages/
│   │   ├── Index.tsx         # Homepage
│   │   ├── About.tsx         # Brand & founder story
│   │   ├── OurStory.tsx      # Editorial brand narrative
│   │   ├── HowWeMakeIt.tsx   # Handcraft process walkthrough
│   │   ├── ProductPage.tsx   # Dynamic product detail page
│   │   ├── GiftGuide.tsx     # Occasion-based gift guide
│   │   ├── FAQ.tsx           # Frequently asked questions
│   │   ├── Contact.tsx       # Custom order & enquiry form
│   │   ├── Shipping.tsx      # Delivery & returns policy
│   │   └── NotFound.tsx      # 404 page
│   │
│   ├── App.tsx               # Root router & provider tree
│   ├── main.tsx              # React entry point
│   └── index.css             # Global styles & design token variables
│
├── .github/workflows/
│   └── deploy.yml            # Automated GitHub Pages deployment
│
├── index.html                # HTML shell + JSON-LD schema + SPA fallback script
├── vite.config.ts            # Vite build configuration
├── tailwind.config.ts        # Custom Tailwind design system
└── package.json
```

---

## 🎨 Design System

JewelPetal uses a custom, hand-crafted design system built on Tailwind CSS with the following palette:

| Token | Color | Usage |
|---|---|---|
| `jp-pearl` | `hsl(30, 33%, 98%)` | Background, cards |
| `jp-deep` | `hsl(348, 24%, 14%)` | Primary headings, body |
| `jp-rosegold` | `hsl(23, 44%, 60%)` | CTAs, accents, brand highlight |
| `jp-petal` | `hsl(14, 48%, 82%)` | Soft accent highlights |
| `jp-blush` | `hsl(10, 35%, 92%)` | Secondary backgrounds |
| `jp-charcoal` | `hsl(340, 13%, 27%)` | Body text, muted labels |
| `jp-cream` | `hsl(38, 26%, 89%)` | Borders, dividers |
| `jp-sage` | `hsl(115, 15%, 62%)` | Botanical accent |
| `jp-lavender` | `hsl(275, 20%, 79%)` | Soft feminine accent |

**Typography:** [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) (serif, headings & editorial) + [Jost](https://fonts.google.com/specimen/Jost) (sans-serif, body & UI)

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/jewelpetal.git
cd jewelpetal

# Install dependencies
npm install

# Start the development server
npm run dev
```

The development server runs at **[http://localhost:8080](http://localhost:8080)**.

### Available Scripts

```bash
npm run dev        # Start local development server with HMR
npm run build      # Compile production bundle to /dist
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint checks
npm run test       # Run unit tests with Vitest
```

---

## 🌍 Deployment (GitHub Pages)

This project deploys automatically to GitHub Pages via GitHub Actions on every push to the `main` branch.

### One-Time Setup

1. Go to your repository **Settings → Pages**
2. Under **Build and deployment → Source**, select **GitHub Actions**
3. *(Optional)* Add your custom domain under **Custom Domain**

### How It Works

The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. Installs Node.js 20 & dependencies via `npm ci`
2. Runs `npm run build` to compile the Vite production bundle
3. Uploads the `/dist` output as a Pages artifact
4. Deploys it to the live GitHub Pages URL

**SPA Routing Fix:** The `public/404.html` + `index.html` script combo ensures all direct URL navigations (e.g., `/about`, `/product/mini-jewelry-bouquet`) work seamlessly on GitHub Pages' static file server without 404 errors.

---

## 🔍 SEO & AI Search Optimization

JewelPetal is built with full **GEO (Generative Engine Optimization)** support for visibility in ChatGPT, Perplexity, Google AI Overviews, and other AI-powered search tools:

- ✅ **`robots.txt`** — Explicitly allows GPTBot, PerplexityBot, ClaudeBot, and Googlebot
- ✅ **`llms.txt`** — Machine-readable E-E-A-T document served at site root for LLM parsers
- ✅ **`sitemap.xml`** — Complete URL map for all 13 pages
- ✅ **JSON-LD Schema** — `Organization` and `WebSite` structured data injected in `<head>`
- ✅ **Open Graph + Twitter Cards** — Social sharing metadata on all pages
- ✅ **React Helmet Async** — Dynamic per-page `<title>` and `<meta>` tags

---

## 📋 Environment Variables

Create a `.env` file in the project root for optional integrations:

```env
# Contact Form (Formspree)
VITE_FORMSPREE_ID=your_formspree_form_id

# PostHog Analytics
VITE_POSTHOG_KEY=your_posthog_api_key

# Shopify Storefront (if connecting live product catalog)
VITE_SHOPIFY_STORE_DOMAIN=yourstore.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your_storefront_api_token
```

> **Note:** All environment variables are optional. The storefront runs beautifully with the built-in mock product catalog when these are not set.

---

## 📜 License

This project is proprietary and all rights are reserved.

© 2026 JewelPetal. Built with love in India by Nancy Gupta.

---

*Flowers die in three days. We make things that last.*
