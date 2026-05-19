from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, PageBreak
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

# ─── COLOURS ────────────────────────────────────────────────────────────────
PEARL      = colors.HexColor("#FAF8F5")   # background / cards
DEEP       = colors.HexColor("#2A1A1F")   # primary text / headings
ROSEGOLD   = colors.HexColor("#C49A6C")   # accent / labels
CHARCOAL   = colors.HexColor("#4A3540")   # body text
DUST       = colors.HexColor("#D9CFC8")   # borders / dividers
WHITE      = colors.white

OUTPUT = r"c:\Projects\jewelpetal\docs\jewelpetal-marketing-team-brief.pdf"

# ─── PAGE TEMPLATE ───────────────────────────────────────────────────────────
W, H = A4
MARGIN = 20 * mm

def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(ROSEGOLD)
    header = "jewelpetal.  ·  team brief  ·  nancy, ishita & aryan  ·  may 2026  ·  confidential"
    canvas.drawCentredString(W / 2, H - 12 * mm, header)
    footer = f"jewelpetal.  ·  internal use only  ·  {doc.page}"
    canvas.drawCentredString(W / 2, 10 * mm, footer)
    canvas.restoreState()

# ─── STYLES ──────────────────────────────────────────────────────────────────
def S(name, **kw):
    return ParagraphStyle(name, **kw)

base        = S("base",       fontName="Helvetica",       fontSize=9,  leading=15, textColor=CHARCOAL, spaceAfter=6)
base_bold   = S("base_bold",  fontName="Helvetica-Bold",  fontSize=9,  leading=15, textColor=DEEP)
h1          = S("h1",         fontName="Helvetica-Bold",  fontSize=22, leading=28, textColor=DEEP,      spaceAfter=4)
h2          = S("h2",         fontName="Helvetica-Bold",  fontSize=13, leading=18, textColor=DEEP,      spaceBefore=14, spaceAfter=6)
h3          = S("h3",         fontName="Helvetica-Bold",  fontSize=10, leading=14, textColor=ROSEGOLD,  spaceBefore=10, spaceAfter=4)
tagline     = S("tagline",    fontName="Helvetica-Oblique", fontSize=13, leading=18, textColor=CHARCOAL)
caption     = S("caption",    fontName="Helvetica",       fontSize=7.5, leading=11, textColor=ROSEGOLD, alignment=TA_CENTER)
cover_label = S("coverlabel", fontName="Helvetica",       fontSize=8,  leading=12, textColor=CHARCOAL)
cover_meta  = S("covermeta",  fontName="Helvetica-Bold",  fontSize=8,  leading=12, textColor=DEEP)
bullet      = S("bullet",     fontName="Helvetica",       fontSize=9,  leading=15, textColor=CHARCOAL, leftIndent=12, spaceAfter=3)
rule_yes    = S("rule_yes",   fontName="Helvetica",       fontSize=9,  leading=13, textColor=colors.HexColor("#2E6B3E"))
rule_no     = S("rule_no",    fontName="Helvetica",       fontSize=9,  leading=13, textColor=colors.HexColor("#8B2222"))
note        = S("note",       fontName="Helvetica-Oblique", fontSize=8, leading=12, textColor=CHARCOAL)

def HR():
    return HRFlowable(width="100%", thickness=0.5, color=DUST, spaceAfter=10, spaceBefore=4)

def SP(h=6):
    return Spacer(1, h * mm)

def B(text, style=base):
    return Paragraph(f"<b>{text}</b>", style)

def P(text, style=base):
    return Paragraph(text, style)

def BUL(text):
    return Paragraph(f"• &nbsp; {text}", bullet)

def table(data, col_widths, header_row=True):
    t = Table(data, colWidths=col_widths, repeatRows=1 if header_row else 0)
    style = [
        ("BACKGROUND",   (0, 0), (-1, 0),  DEEP),
        ("TEXTCOLOR",    (0, 0), (-1, 0),  WHITE),
        ("FONTNAME",     (0, 0), (-1, 0),  "Helvetica-Bold"),
        ("FONTSIZE",     (0, 0), (-1, 0),  8),
        ("BOTTOMPADDING",(0, 0), (-1, 0),  6),
        ("TOPPADDING",   (0, 0), (-1, 0),  6),
        ("FONTNAME",     (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE",     (0, 1), (-1, -1), 8),
        ("ROWBACKGROUNDS",(0,1), (-1,-1),  [PEARL, WHITE]),
        ("TOPPADDING",   (0, 1), (-1, -1), 5),
        ("BOTTOMPADDING",(0, 1), (-1, -1), 5),
        ("LEFTPADDING",  (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("GRID",         (0, 0), (-1, -1), 0.4, DUST),
        ("VALIGN",       (0, 0), (-1, -1), "TOP"),
    ]
    t.setStyle(TableStyle(style))
    return t

# ─── CONTENT ─────────────────────────────────────────────────────────────────
story = []
CW = W - 2 * MARGIN   # usable content width

# ═══════════════════════════════════════════════════════════════════════════════
# COVER PAGE
# ═══════════════════════════════════════════════════════════════════════════════
story += [
    SP(30),
    Paragraph("jewelpetal.", h1),
    Paragraph("the bouquet she actually keeps.", tagline),
    SP(10),
    HR(),
    SP(4),
    Paragraph("TEAM BRIEF", S("tb", fontName="Helvetica-Bold", fontSize=16, leading=20, textColor=DEEP)),
    P("Brand Introduction, Visual World &amp; Digital Operations Guide", tagline),
    SP(12),
    table(
        [
            ["For",   "Nancy Gupta  +  Ishita Bansal  +  Aryan Panwar"],
            ["From",  "Nancy Gupta  —  Co-Founder &amp; Creative Director"],
            ["Date",  "May 2026"],
            ["Version", "1.0  ·  Confidential"],
        ],
        [30 * mm, CW - 30 * mm],
        header_row=False,
    ),
    SP(12),
    HR(),
    P("<i>Read this before you photograph a single bouquet, post a single story, or touch a single line of code.</i>", note),
    PageBreak(),
]

# ═══════════════════════════════════════════════════════════════════════════════
# PART 1 — WHO WE ARE
# ═══════════════════════════════════════════════════════════════════════════════
story += [
    P("PART 1 — WHO WE ARE", h3),
    Paragraph("Welcome to JewelPetal.", h2),
    HR(),
    P("Hi. Welcome to the team."),
    P("JewelPetal is a premium handcrafted gifting brand from India. We make jewelry and fashion accessory gift bouquets — arrangements that replace temporary flowers with wearable, lasting beauty. Every bouquet is hand-styled with real anti-tarnish jewelry, velvet hair accessories, satin ribbons, and beauty items, wrapped in premium linen and delivered in coordinated packaging."),
    P("We exist because flowers die in three days. We make things that last."),
    P("This document tells you everything you need to know to operate JewelPetal: what the brand is, what it looks like, what it sounds like, how it is built online, and exactly how each of us contributes to making it work."),
    SP(4),
    Paragraph("The Brand in Seven Lines", h2),
    HR(),
    BUL("<b>Name:</b> JewelPetal. Always capitalised exactly this way. Never JEWELPETAL. Never jewelpetal."),
    BUL("<b>Tagline:</b> The bouquet she actually keeps."),
    BUL("<b>What we make:</b> Handcrafted jewelry and fashion accessory gift bouquets. Four permanent collections, with seasonal and custom extensions."),
    BUL("<b>Who we are for:</b> The woman who wants to give a gift that says something. The girl who is tired of flowers. The buyer who wants something Indian, premium, and personal."),
    BUL("<b>What we are not:</b> A flower shop. A craft market brand. A generic gifting company. Never use the word 'cheap' or 'affordable' in any brand-facing copy."),
    BUL("<b>The benchmarks:</b> Forest Essentials (Indian luxury done right), Chumbak (Indian brand with a voice), Anita Dongre (handmade with prestige). Study these before you make anything."),
    BUL("<b>The one rule:</b> Everything we make should feel chosen, not just purchased."),
    SP(4),
    Paragraph("The Collection Model", h2),
    HR(),
    P("JewelPetal has four permanent collections. These are not limited drops — they are the core catalogue, refined over time."),
    SP(3),
    table(
        [
            ["COLLECTION", "PRICE", "WHAT IT CONTAINS"],
            ["Mini Jewelry Bouquet", "₹150 – ₹250", "1–5 handcrafted jewelry items. For bulk gifting, corporate orders, and light tokens of affection."],
            ["Standard 7-Item Bouquet", "₹599", "7 hand-rolled premium jewelry items: earrings, necklaces, bracelets, hair claws. Botanical wraps."],
            ["Standard 9-Item Bouquet", "₹699", "9 premium jewelry and hair styling pieces. Coordinated pastel linen wrapping layers."],
            ["Premium Custom Bouquet", "From ₹999", "10+ premium elements. Fully customisable. Add chocolates, photographs, hand-knit crochet items."],
        ],
        [52 * mm, 28 * mm, CW - 80 * mm],
    ),
    SP(4),
    Paragraph("The JewelPetal Voice — Memorise This", h2),
    HR(),
    P("Before you write a single caption, a single product description, or a single WhatsApp message to a customer — understand the voice. It governs everything."),
    P("<i>Warm, personal, confident. The friend who has great taste and shares it generously. Never salesy. Never corporate. Never try-hard.</i>", note),
    SP(3),
    table(
        [
            ["WE ALWAYS", "WE NEVER"],
            ["Write like we are talking to one specific person.", "Use exclamation marks. Ever."],
            ["Lead with the feeling, not the product.", "Say 'shop now' or 'buy now' in captions."],
            ["Mention what it feels like to give and receive it.", "Use the word 'affordable' or 'cheap'."],
            ["Use warm, specific language. 'Dainty gold hoops' not 'earrings'.", "Say 'luxury' — we show it, we never say it."],
            ["Keep captions to 2–4 lines maximum.", "Explain the sentiment. If it needs explaining, rewrite it."],
            ["End with stillness — not a call to action.", "Tag suppliers or vendors in public-facing posts."],
        ],
        [CW / 2, CW / 2],
    ),
    PageBreak(),
]

# ═══════════════════════════════════════════════════════════════════════════════
# PART 2 — THE VISUAL WORLD
# ═══════════════════════════════════════════════════════════════════════════════
story += [
    P("PART 2 — THE VISUAL WORLD", h3),
    Paragraph("The Aesthetic Reference", h2),
    HR(),
    P("JewelPetal's visual world is: natural-light studio flatlay. Warm. Linen-textured. Premium but accessible. Every image should feel like it was styled by someone with taste in her own home — not shot in a commercial studio."),
    P("Reference brands for visual direction: &amp;Other Stories, Mejuri, Anita Dongre gifting campaigns, early Chumbak editorial. Study their product photography before shooting anything."),
    SP(3),
    Paragraph("Energy 1 — Natural Light Studio Flatlay", h3),
    P("The primary aesthetic for all product photography. Pale linen or cotton surface. Warm directional window light from the left or top-left. Objects placed with breathing room — never crowded. Soft shadows. Warm tones. This is the setting for all four collections on the website and Instagram feed."),
    Paragraph("Energy 2 — The Gift Moment", h3),
    P("The bouquet in someone's hands. A gift being unwrapped. The reaction. These are the most shareable images — they capture emotion, not just product. Shot candidly. Warm indoor light. Slightly soft focus on the background. The bouquet is always sharp."),
    Paragraph("Energy 3 — Close Detail", h3),
    P("Extreme close-up of individual jewelry pieces, ribbon textures, linen wrapping layers. This content communicates craft and quality. One detail per frame. The entire image breathes around it."),
    Paragraph("Energy 4 — Occasion Context", h3),
    P("The bouquet placed in a birthday setup, a wedding flat lay, a desk gifting moment. The product lives in a real life context. Pastel tones. Never cluttered. The bouquet is always the hero of the frame."),
    SP(3),
    Paragraph("The Colour System — Non-Negotiable", h2),
    HR(),
    table(
        [
            ["COLOUR", "HEX", "HOW IT IS USED"],
            ["JewelPetal Pearl",   "#FAF8F5", "The base of everything. Every copy card. Every designed graphic. Every photography surface. NEVER pure white."],
            ["JewelPetal Deep",    "#2A1A1F", "All primary headings and typography on designed cards. Never used as a full background."],
            ["JewelPetal Rosegold","#C49A6C", "The brand accent. CTAs, labels, ribbon highlights. The defining colour of the brand. Use with restraint."],
            ["JewelPetal Blush",   "#F2E8E4", "Secondary backgrounds, card fills, linen wrapping colour reference."],
            ["JewelPetal Sage",    "#8FAB87", "Botanical accent. Appears as leaf detail, greenery in arrangements. Never dominant."],
            ["JewelPetal Lavender","#C4B5CC", "Surprise colour. Use once every 5–6 posts. When it appears, it lands."],
        ],
        [38 * mm, 24 * mm, CW - 62 * mm],
    ),
    SP(4),
    Paragraph("The Visual Rules That Never Break", h2),
    HR(),
    Paragraph("✓  Warm light. Always directional. Never flat. Never ring light on product.", rule_yes),
    Paragraph("✓  Negative space. Bouquets breathe. At least a third of every image is background.", rule_yes),
    Paragraph("✓  One hero per image. Not the bouquet AND the card AND the packaging. One thing.", rule_yes),
    Paragraph("✓  Linen, cotton, or marble surfaces only. No plastic, no synthetic textures.", rule_yes),
    Paragraph("✓  Every image should look like it belongs in a gifting editorial magazine.", rule_yes),
    SP(2),
    Paragraph("✗  No white backgrounds in Instagram content. JewelPetal Pearl only. White is for product e-commerce shots only.", rule_no),
    Paragraph("✗  No graphic drop shadows. No gradients. No modern digital effects.", rule_no),
    Paragraph("✗  No crowded frames. If more than two props appear, remove one.", rule_no),
    Paragraph("✗  No harsh flash photography. Ever.", rule_no),
    Paragraph("✗  No filters that shift the colour away from warm. Cooler tones kill the brand.", rule_no),
    PageBreak(),
]

# ═══════════════════════════════════════════════════════════════════════════════
# PART 3 — ARYAN'S ROLE
# ═══════════════════════════════════════════════════════════════════════════════
story += [
    P("PART 3 — ARYAN'S ROLE", h3),
    Paragraph("Technical Head, Website &amp; Digital Infrastructure", h2),
    HR(),
    P("Aryan — you are the technical backbone of JewelPetal's digital presence. You built the storefront, you manage the infrastructure, and you are responsible for ensuring that every customer who lands on the website has a flawless, premium experience. Everything on the digital side goes through you."),
    SP(3),
    Paragraph("Your Primary Responsibilities", h3),
    table(
        [
            ["AREA", "WHAT THIS MEANS"],
            ["Storefront (jewelpetal.in)", "Own the full React + Vite codebase. All UI changes, new pages, feature additions, and bug fixes are your domain. The site must always be live, fast, and mobile-perfect."],
            ["Product Catalogue Management", "When Nancy and Ishita add or update products, you update the product data in the codebase. Images must be correctly sized, named, and optimised. Descriptions are written by Nancy — you implement them."],
            ["SEO & AI Visibility", "Maintain robots.txt (AI crawlers always allowed), sitemap.xml, llms.txt, and JSON-LD structured data schemas. When new pages are added, the sitemap is updated within 24 hours."],
            ["Performance & Analytics", "Monitor PostHog for user behaviour patterns. Flag any page with high bounce rates to Nancy. Monthly performance report shared via WhatsApp."],
            ["GitHub & Deployment", "All code lives in the GitHub repository. Every change goes through a commit with a clear message. The GitHub Actions deploy pipeline is your responsibility — if the build breaks, you fix it same day."],
            ["Contact Form & Newsletter", "Formspree and the newsletter subscription endpoint are maintained by you. If a customer's message fails to send, it is escalated to Nancy within 2 hours."],
            ["Environment & Keys", "All API keys and environment variables are in the secure .env file. Never commit keys to the repository. Rotate any exposed key immediately."],
        ],
        [44 * mm, CW - 44 * mm],
    ),
    SP(4),
    Paragraph("The Tech Stack You Own", h3),
    table(
        [
            ["LAYER", "TECHNOLOGY", "YOUR ROLE"],
            ["Frontend Framework", "React 18 + TypeScript", "Full ownership. You wrote it, you maintain it."],
            ["Build Tool", "Vite 5 (SWC)", "Build config, optimisation, chunk strategy."],
            ["Styling", "Tailwind CSS + Custom Design Tokens", "All design token updates go through you."],
            ["Routing", "React Router DOM v6", "All new pages require a new route."],
            ["State", "Zustand (cart + auth)", "Cart logic and any future auth flows."],
            ["SEO", "React Helmet Async + JSON-LD", "Per-page meta tags on every new page."],
            ["Analytics", "PostHog + Vercel Analytics", "Event tracking setup for new features."],
            ["Hosting", "GitHub Pages (GitHub Actions)", "Deploy pipeline. Zero downtime target."],
        ],
        [38 * mm, 44 * mm, CW - 82 * mm],
    ),
    SP(4),
    Paragraph("Image & Asset Standards", h3),
    P("Every product image must meet these specifications before going live on the website:"),
    BUL("<b>Format:</b> PNG (current) or WebP (preferred for production launch)."),
    BUL("<b>Minimum resolution:</b> 1200 × 1200px for square product images."),
    BUL("<b>Background:</b> JewelPetal Pearl (#FAF8F5) or transparent. Never pure white."),
    BUL("<b>Naming convention:</b> product-[collection-slug]-[variant].png  e.g. product-std-7-rosegold.png"),
    BUL("<b>File size:</b> Under 300KB per image for web. Use squoosh.app to compress if needed."),
    BUL("<b>Alt text:</b> Written by Nancy. Implemented by Aryan in the product data file."),
    PageBreak(),
]

# ═══════════════════════════════════════════════════════════════════════════════
# PART 4 — NANCY & ISHITA'S ROLES
# ═══════════════════════════════════════════════════════════════════════════════
story += [
    P("PART 4 — NANCY &amp; ISHITA'S ROLES", h3),
    Paragraph("Nancy Gupta — Co-Founder, Creative Director &amp; Product Lead", h2),
    HR(),
    P("Nancy — you are the creative and commercial heart of JewelPetal. Every product, every caption, every customer message, every business decision originates with you. Ishita executes operations. Aryan executes the digital world. But the brand's soul is yours."),
    SP(3),
    table(
        [
            ["AREA", "WHAT THIS MEANS"],
            ["Product Curation", "You select every jewelry piece, hair accessory, and beauty item that goes into every bouquet. Quality check on every unit before it is photographed or shipped."],
            ["Creative Direction", "You approve every photograph before it goes to Aryan for the website. You approve every caption before it is posted. Nothing public is final without your sign-off."],
            ["Brand Copywriting", "All product descriptions, page copy, Instagram captions, and customer-facing text is written or approved by you. Send final copy to Aryan for implementation."],
            ["Custom Order Management", "All custom order enquiries come through the website contact form. You assess, quote, and confirm every custom order personally."],
            ["Supplier & Vendor Relations", "All sourcing relationships are managed by you. Aryan does not communicate with vendors."],
            ["Pricing & Margins", "Final pricing decisions on all collections and custom orders rest with you."],
        ],
        [44 * mm, CW - 44 * mm],
    ),
    SP(6),
    Paragraph("Ishita Bansal — Co-Founder &amp; Operations Lead", h2),
    HR(),
    P("Ishita — you are the operational engine of JewelPetal. You ensure that what Nancy creates and what Aryan builds actually reaches the customer in perfect condition, on time, and with a premium experience at every step."),
    SP(3),
    table(
        [
            ["AREA", "WHAT THIS MEANS"],
            ["Order Fulfilment", "Every order placed through the website is packed, wrapped, and dispatched by you. Each bouquet leaves in perfect condition — no exceptions."],
            ["Packaging Execution", "You execute Nancy's packaging vision: the linen wraps, the ribbon styling, the greeting card placement, the seal. Nancy sets the standard. You maintain it on every single unit."],
            ["Shipping & Logistics", "You manage all courier relationships, tracking updates, and delivery confirmations. Any delivery issue is escalated to Nancy within the same day."],
            ["Inventory Tracking", "You maintain a real-time count of all jewelry pieces, hair accessories, and packaging materials. Restock alerts go to Nancy when any item drops below the two-week threshold."],
            ["Customer Communication (Post-Order)", "Order confirmation and tracking messages go from you to the customer via WhatsApp. Nancy reviews the message template. You send it."],
            ["Instagram DM Monitoring", "You monitor the @jewelpetal.in Instagram DMs daily. Enquiries are forwarded to Nancy within 2 hours. You do not quote prices or confirm orders independently."],
        ],
        [44 * mm, CW - 44 * mm],
    ),
    SP(4),
    Paragraph("The Approval Flow — How Decisions Move", h2),
    HR(),
    P("Nothing public is final without Nancy's explicit approval. This is not bureaucracy — it is brand protection."),
    SP(2),
    table(
        [
            ["WHAT", "WHO CREATES", "WHO APPROVES", "WHO PUBLISHES"],
            ["Product photography", "Nancy / Ishita shoot", "Nancy", "Aryan (website) / Nancy (Instagram)"],
            ["Product descriptions", "Nancy writes", "Nancy", "Aryan implements"],
            ["Instagram captions", "Nancy writes", "Nancy", "Nancy posts"],
            ["Custom order quotes", "Nancy writes", "Nancy", "Ishita sends via WhatsApp"],
            ["Website copy changes", "Nancy writes", "Nancy", "Aryan implements"],
            ["New product listings", "Nancy provides all details", "Nancy", "Aryan builds & deploys"],
            ["Shipping policy changes", "Nancy decides", "Nancy", "Aryan updates website"],
        ],
        [40 * mm, 38 * mm, 30 * mm, CW - 108 * mm],
    ),
    PageBreak(),
]

# ═══════════════════════════════════════════════════════════════════════════════
# PART 5 — LAUNCH PRIORITIES
# ═══════════════════════════════════════════════════════════════════════════════
story += [
    P("PART 5 — LAUNCH PRIORITIES &amp; NON-NEGOTIABLES", h3),
    Paragraph("Pre-Launch Checklist", h2),
    HR(),
    P("Before JewelPetal accepts its first public order, every item on this checklist must be complete and confirmed by Nancy."),
    SP(3),
    table(
        [
            ["TASK", "WHO", "STATUS"],
            ["Website live at jewelpetal.in with all four collections", "Aryan", "⬜ Pending"],
            ["All product images shot and approved", "Nancy / Ishita", "⬜ Pending"],
            ["All product descriptions written and implemented", "Nancy → Aryan", "⬜ Pending"],
            ["Contact form tested — messages arrive in inbox", "Aryan", "⬜ Pending"],
            ["Instagram account @jewelpetal.in set up with bio and highlights", "Nancy", "⬜ Pending"],
            ["Packaging materials sourced and stocked for first 50 orders", "Ishita", "⬜ Pending"],
            ["Shipping partner confirmed. First test shipment sent.", "Ishita", "⬜ Pending"],
            ["Custom order process tested end-to-end", "All three", "⬜ Pending"],
            ["WhatsApp Business number set up for customer communication", "Ishita", "⬜ Pending"],
            ["Google Business Profile created (if applicable)", "Nancy", "⬜ Pending"],
            ["Payment method confirmed for first orders", "Nancy", "⬜ Pending"],
        ],
        [82 * mm, 40 * mm, CW - 122 * mm],
    ),
    SP(6),
    Paragraph("The Non-Negotiable Rules for All Three", h2),
    HR(),
    P("<b>Nothing goes public without Nancy's approval. Not a single post, product listing, or customer message.</b>", base_bold),
    SP(2),
    Paragraph("✓  Every product goes live on the website only after Nancy has approved the image AND the description.", rule_yes),
    Paragraph("✓  Every Instagram post, Story, and Reel is approved by Nancy before it is scheduled or posted.", rule_yes),
    Paragraph("✓  Every customer quote and custom order confirmation is sent by Nancy or reviewed by Nancy before Ishita sends it.", rule_yes),
    Paragraph("✓  Every code deployment to the live website is tested by Aryan on a local build first. No untested changes go live.", rule_yes),
    Paragraph("✓  Respond to Nancy on WhatsApp within 30 minutes during working hours.", rule_yes),
    SP(2),
    Paragraph("✗  Ishita does not quote prices or confirm custom orders without Nancy's input.", rule_no),
    Paragraph("✗  Aryan does not change product descriptions, prices, or brand copy without Nancy's written approval.", rule_no),
    Paragraph("✗  No vendor, supplier, or logistics partner is communicated with publicly on behalf of JewelPetal without Nancy's knowledge.", rule_no),
    Paragraph("✗  No discounts, offers, or promotional pricing without Nancy's explicit decision.", rule_no),
    SP(6),
    HR(),
    P("<i>The goal is simple: when the first customer opens her JewelPetal bouquet, she should feel that someone with real taste made something just for her. Every decision we make before that moment — every photograph, every caption, every ribbon tied — builds toward that feeling.</i>", note),
    SP(4),
    HR(),
    Paragraph("Questions: guptanancy1249@gmail.com", caption),
    Paragraph("Version 1.0  ·  May 2026  ·  JewelPetal  ·  Confidential", caption),
]

# ─── BUILD ────────────────────────────────────────────────────────────────────
doc = SimpleDocTemplate(
    OUTPUT,
    pagesize=A4,
    leftMargin=MARGIN,
    rightMargin=MARGIN,
    topMargin=18 * mm,
    bottomMargin=18 * mm,
    title="JewelPetal — Team Brief",
    author="Nancy Gupta",
    subject="Brand Introduction, Visual World & Digital Operations Guide",
)

doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
print(f"PDF generated successfully: {OUTPUT}")
