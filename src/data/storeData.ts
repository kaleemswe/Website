import heroStudioImg from '../assets/images/hero_studio_objects_1794722196589.jpg';
import brassLampImg from '../assets/images/product_brass_lamp_1794722196299.jpg';
import titaniumWatchImg from '../assets/images/product_titanium_watch_1794722196352.jpg';
import acousticSpeakerImg from '../assets/images/product_acoustic_speaker_1794722197222.jpg';
import ceramicCarafeImg from '../assets/images/product_ceramic_carafe_1794722198801.jpg';
import leatherCarryImg from '../assets/images/product_leather_carry_1794722198312.jpg';
import walnutDeskTrayImg from '../assets/images/product_walnut_desk_tray_1794722198226.jpg';
import { PortfolioProject, Product, ProductCategory } from '../types/store';

export const HERO_IMAGE = {
  src: heroStudioImg,
  alt: 'Architectural studio living space featuring a brushed brass lamp, matte stoneware vessel, and solid walnut credenza',
};

export const CATEGORIES: ProductCategory[] = [
  'All',
  'Lighting',
  'Timepieces',
  'Audio',
  'Ceramics',
  'Carry',
  'Workspace',
];

export const FREE_SHIPPING_THRESHOLD = 250;
export const STANDARD_SHIPPING_FEE = 18;
export const PROMO_CODES: Record<string, { rate: number; label: string }> = {
  KALEEMULLAH10: { rate: 0.1, label: '10% Client Preview Credit' },
  PORTFOLIO15: { rate: 0.15, label: '15% Portfolio Demo Discount' },
};

export const PRODUCTS: Product[] = [
  {
    id: 'solis-brass-lamp',
    sku: 'KL-LGT-01',
    name: 'Solis Opal Table Lamp',
    category: 'Lighting',
    material: 'Brushed Brass & Frosted Glass',
    price: 295,
    rating: 4.9,
    reviewCount: 48,
    stockStatus: 'In Stock',
    stockCount: 14,
    featured: true,
    shortDescription:
      'Hand-blown opal glass dome balanced on a curved solid brushed brass stem with warm stepless dimming.',
    description:
      'Engineered for quiet evening desks and reading corners, the Solis Opal Table Lamp pairs mouth-blown acid-etched glass with a CNC-turned brass base. The weighted plinth houses a tactile rotary dimmer rated for 40,000 hours of warm 2700K illumination.',
    image: brassLampImg,
    imageAlt: 'Minimalist brushed brass and frosted opal glass dome table lamp on pale travertine stone',
    variants: [
      { id: 'brushed-brass', name: 'Brushed Brass', hex: '#B5945B', priceDelta: 0 },
      { id: 'aged-bronze', name: 'Aged Bronze', hex: '#5A4634', priceDelta: 20 },
      { id: 'satin-nickel', name: 'Satin Nickel', hex: '#A1A1AA', priceDelta: 0 },
    ],
    specs: [
      { label: 'Dimensions', value: '240 mm W × 310 mm H' },
      { label: 'Materials', value: 'Solid C360 Brass, Acid-Etched Opal Glass' },
      { label: 'Light Output', value: '2700K Warm LED · 480 lm · CRI 95+' },
      { label: 'Warranty', value: '3-Year Studio Hardware Guarantee' },
    ],
  },
  {
    id: 'meridian-ti-watch',
    sku: 'KL-TMP-02',
    name: 'Meridian Grade-5 Field Watch',
    category: 'Timepieces',
    material: 'Grade-5 Titanium & Sapphire',
    price: 460,
    rating: 4.8,
    reviewCount: 64,
    stockStatus: 'Limited Run',
    stockCount: 6,
    featured: true,
    shortDescription:
      'Bead-blasted titanium case with anti-reflective sapphire crystal, charcoal sunray dial, and calfskin strap.',
    description:
      'Built for daily wear with minimal wrist weight, the Meridian Field Watch houses a regulated automatic movement inside a 39mm Grade-5 titanium shell. Quick-release vegetable-tanned leather straps let you switch finishes without tools.',
    image: titaniumWatchImg,
    imageAlt: 'Brushed titanium mechanical wristwatch with matte charcoal dial and black stitched leather strap',
    variants: [
      { id: 'charcoal-black', name: 'Charcoal / Black Strap', hex: '#27272A', priceDelta: 0 },
      { id: 'slate-saddle', name: 'Slate / Saddle Strap', hex: '#78553A', priceDelta: 0 },
    ],
    specs: [
      { label: 'Case Size', value: '39.0 mm Diameter × 9.8 mm Thin' },
      { label: 'Movement', value: 'Caliber 9015 Automatic · 42h Reserve' },
      { label: 'Crystal', value: 'Domed Sapphire with Inner AR Coating' },
      { label: 'Water Resistance', value: '100 Meters / 10 ATM' },
    ],
  },
  {
    id: 'monolith-bookshelf-audio',
    sku: 'KL-AUD-03',
    name: 'Monolith Reference Speaker',
    category: 'Audio',
    material: 'Anodized Aluminum & Acoustic Wool',
    price: 380,
    rating: 4.9,
    reviewCount: 39,
    stockStatus: 'In Stock',
    stockCount: 9,
    featured: true,
    shortDescription:
      'Compact wireless studio monitor wrapped in Kvadrat acoustic wool with milled aluminum top controls.',
    description:
      'Tuned for neutral near-field listening in living spaces and design studios, the Monolith Speaker combines a rigid extruded aluminum chassis with a custom 4-inch long-throw woofer and silk-dome tweeter. Supports lossless USB-C, AirPlay, and Bluetooth 5.3.',
    image: acousticSpeakerImg,
    imageAlt: 'Anodized silver aluminum and heather grey woven wool wireless bookshelf speaker on stone pedestal',
    variants: [
      { id: 'silver-heather', name: 'Silver / Heather Wool', hex: '#9CA3AF', priceDelta: 0 },
      { id: 'graphite-obsidian', name: 'Graphite / Obsidian Wool', hex: '#1F2937', priceDelta: 25 },
    ],
    specs: [
      { label: 'Dimensions', value: '165 mm W × 230 mm H × 150 mm D' },
      { label: 'Amplification', value: '80W Class-D Bi-Amplified' },
      { label: 'Connectivity', value: 'Wi-Fi, AirPlay, Bluetooth 5.3, USB-C' },
      { label: 'Warranty', value: '2-Year Electronics Coverage' },
    ],
  },
  {
    id: 'kuro-pour-over-set',
    sku: 'KL-CER-04',
    name: 'Kuro Stoneware Pour-Over Set',
    category: 'Ceramics',
    material: 'Matte Iron Stoneware & Walnut',
    price: 118,
    rating: 4.7,
    reviewCount: 83,
    stockStatus: 'In Stock',
    stockCount: 22,
    featured: false,
    shortDescription:
      'Wheel-thrown slate stoneware cone dripper and 600ml server with sculpted American walnut handle.',
    description:
      'Fired at 1,240°C for superior heat retention during slow morning extractions, the Kuro Pour-Over Set features internal spiral ribs that regulate drawdown speed. Each oiled walnut handle is removable for effortless cleaning.',
    image: ceramicCarafeImg,
    imageAlt: 'Handcrafted matte charcoal stoneware pour-over coffee dripper and carafe with walnut handle',
    variants: [
      { id: 'slate-walnut', name: 'Matte Slate / Walnut', hex: '#3F3F46', priceDelta: 0 },
      { id: 'raw-linen', name: 'Raw Linen / Oak', hex: '#D6D3CD', priceDelta: 0 },
    ],
    specs: [
      { label: 'Capacity', value: '600 ml Carafe · Fits V60 02 Filters' },
      { label: 'Material', value: 'High-Fire Iron Stoneware & Walnut' },
      { label: 'Care', value: 'Dishwasher-safe ceramic; hand-wipe wood' },
      { label: 'Origin', value: 'Small-Batch Kiln Production' },
    ],
  },
  {
    id: 'atelier-leather-carry',
    sku: 'KL-CRY-05',
    name: 'Atelier Structured Weekender',
    category: 'Carry',
    material: 'Full-Grain Pebble Leather',
    price: 340,
    rating: 4.9,
    reviewCount: 31,
    stockStatus: 'In Stock',
    stockCount: 11,
    featured: false,
    shortDescription:
      'Architectural weekender duffle and matching daily tote cut from weather-resistant Italian pebble leather.',
    description:
      'Designed around a 16-inch padded laptop compartment and wide-mouth YKK Excella dual zipper, the Atelier Weekender transitions cleanly from studio commutes to three-day client travel without losing its structured silhouette.',
    image: leatherCarryImg,
    imageAlt: 'Structured minimalist full-grain black pebble leather everyday tote and weekender bag on pale stone',
    variants: [
      { id: 'obsidian-black', name: 'Obsidian Pebble', hex: '#18181B', priceDelta: 0 },
      { id: 'espresso-bark', name: 'Espresso Bark', hex: '#4B3629', priceDelta: 0 },
    ],
    specs: [
      { label: 'Dimensions', value: '460 mm W × 290 mm H × 210 mm D' },
      { label: 'Capacity', value: '28 Liters · Cabin Overhead Compliant' },
      { label: 'Hardware', value: 'Brushed Gunmetal YKK Excella Zippers' },
      { label: 'Warranty', value: '5-Year Stitch & Hardware Guarantee' },
    ],
  },
  {
    id: 'datum-walnut-valet',
    sku: 'KL-WRK-06',
    name: 'Datum Milled Desk Valet',
    category: 'Workspace',
    material: 'Solid Walnut & Anodized Aluminum',
    price: 145,
    rating: 4.8,
    reviewCount: 57,
    stockStatus: 'In Stock',
    stockCount: 19,
    featured: false,
    shortDescription:
      'Precision-milled American walnut desktop tray with leather-lined pocket and machined pen channel.',
    description:
      'Bring quiet order to everyday instruments. The Datum Desk Valet pairs a chamfered hardwood perimeter with a micro-suede base and modular anodized aluminum dividers sized for fountain pens, keys, watches, and wireless earbuds.',
    image: walnutDeskTrayImg,
    imageAlt: 'Precision milled solid walnut and matte black anodized aluminum desk valet tray with fountain pen',
    variants: [
      { id: 'walnut-matte-black', name: 'Walnut / Matte Black', hex: '#5C4033', priceDelta: 0 },
      { id: 'smoked-oak-slate', name: 'Smoked Oak / Slate', hex: '#71717A', priceDelta: 10 },
    ],
    specs: [
      { label: 'Dimensions', value: '275 mm L × 185 mm W × 24 mm H' },
      { label: 'Weight', value: '680 g Weighted Non-Slip Base' },
      { label: 'Lining', value: 'Vegetable-Tanned Full-Grain Insert' },
      { label: 'Finish', value: 'Hand-Rubbed Matte Tung Oil' },
    ],
  },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'nordic-lighting-commerce',
    title: 'Solis Architectural Lighting Storefront',
    client: 'Solis Studio Copenhagen',
    category: 'Direct-to-Consumer E-Commerce',
    year: '2026',
    summary:
      'Designed and built a responsive product showcase and variant configurator featuring high-resolution gallery views, instant bag updates, and zero-latency category filtering.',
    deliverables: [
      'Responsive grid system & modular product detail drawer',
      'Client-side cart persistence with promo validation',
      'Sub-200ms interactive filter and sort pipeline',
    ],
    outcome: 'Increased average mobile session checkout completion by 34% across client usability tests.',
    image: brassLampImg,
    imageAlt: 'Solis brushed brass lighting e-commerce preview',
    stack: ['React 19', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'meridian-horology-catalog',
    title: 'Meridian Timepieces Digital Flagship',
    client: 'Meridian Horology',
    category: 'Luxury Retail & Variant Configurator',
    year: '2026',
    summary:
      'Crafted a clean editorial product catalog focused on crisp macro photography, clear technical specification tables, and multi-step shipping & payment verification.',
    deliverables: [
      'Finish & strap swatch configurator with live pricing',
      'Technical specification comparison layout',
      'Accessible keyboard-navigable checkout experience',
    ],
    outcome: 'Adopted as the primary client demo template for boutique retail onboarding.',
    image: titaniumWatchImg,
    imageAlt: 'Meridian brushed titanium watch flagship showcase',
    stack: ['React', 'Vite', 'Accessible UI'],
  },
  {
    id: 'kuro-artisan-checkout',
    title: 'Kuro Ceramics & Everyday Carry Platform',
    client: 'Kuro Workshop',
    category: 'Artisanal Marketplace',
    year: '2025',
    summary:
      'Built an adaptable storefront architecture combining small-batch ceramic goods and leather carry essentials with saved wishlists and instant receipt generation.',
    deliverables: [
      'Saved items / wishlist filtering workflow',
      'Dual payment flow supporting Card & Cash on Delivery',
      'Responsive breakpoints from 375px mobile to 1440px desktop',
    ],
    outcome: 'Delivered a reusable frontend commerce foundation with clean, maintainable components.',
    image: ceramicCarafeImg,
    imageAlt: 'Kuro stoneware pour-over coffee collection preview',
    stack: ['TypeScript', 'Tailwind v4', 'LocalStorage State'],
  },
];
