import { ArrowRight } from 'lucide-react';
import { HERO_IMAGE } from '../data/storeData';
import { ResilientImage } from './ResilientImage';

interface HeroProps {
  onBrowseCatalog: () => void;
  onViewPortfolio: () => void;
}

const STUDIO_HIGHLIGHTS = [
  {
    label: 'Free Shipping',
    detail: 'Complimentary delivery on orders over $250',
  },
  {
    label: 'Flexible Checkout',
    detail: 'Supports both Card and Cash on Delivery',
  },
  {
    label: 'Responsive Architecture',
    detail: 'Tested across desktop, tablet, and mobile screens',
  },
  {
    label: 'Designed by Kaleemullah',
    detail: 'Live e-commerce showcase for client evaluation',
  },
];

export function Hero({ onBrowseCatalog, onViewPortfolio }: HeroProps) {
  return (
    <section id="top" className="bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* 2-Column Balanced Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center py-2 lg:py-6">
            <p className="text-xs sm:text-sm font-medium text-zinc-500 mb-4">
              Curated Everyday Objects · Live Client Demo Storefront
            </p>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-[46px] font-semibold tracking-tight text-zinc-950 leading-[1.12] [text-wrap:balance] max-w-xl">
              Architectural essentials built for quiet, modern spaces.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-xl">
              Explore a complete frontend e-commerce experience engineered by{' '}
              <span className="font-medium text-zinc-950">Kaleemullah</span>. Browse
              studio-grade objects, configure finishes, test cart persistence,
              and preview a real checkout flow ready for client review.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onBrowseCatalog}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-zinc-950 rounded-lg hover:bg-zinc-800 active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
              >
                <span>Browse Catalog</span>
                <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
              </button>

              <button
                type="button"
                onClick={onViewPortfolio}
                className="inline-flex items-center px-6 py-3 text-sm font-medium text-zinc-800 bg-zinc-100 rounded-lg hover:bg-zinc-200 active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
              >
                View Portfolio Projects
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="w-full h-full min-h-[280px] sm:min-h-[360px] lg:min-h-[420px] rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200">
              <ResilientImage
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                fallbackTitle="Architectural Studio Collection"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Guarantee & Studio Strip */}
        <div className="mt-10 lg:mt-14 pt-8 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STUDIO_HIGHLIGHTS.map((item) => (
            <div key={item.label} className="space-y-1">
              <h2 className="font-display text-sm font-semibold text-zinc-950">
                {item.label}
              </h2>
              <p className="text-sm text-zinc-600 leading-snug">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
