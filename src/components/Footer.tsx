export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-zinc-800">
          <div className="space-y-2 max-w-md">
            <span className="font-display text-lg font-bold tracking-tight text-white">
              Kaleemullah
            </span>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Frontend e-commerce showcase built by Kaleemullah for client testing and
              portfolio demonstration.
            </p>
          </div>

          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center gap-6 text-sm text-zinc-300"
          >
            <a href="#catalog" className="hover:text-white transition-colors">
              Catalog
            </a>
            <a href="#collections" className="hover:text-white transition-colors">
              Collections
            </a>
            <a href="#portfolio" className="hover:text-white transition-colors">
              Portfolio
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Kaleemullah. All rights reserved.</p>
          <p>Demo Promo Codes: KALEEMULLAH10 · PORTFOLIO15</p>
        </div>
      </div>
    </footer>
  );
}
