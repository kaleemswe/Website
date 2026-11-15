import { useMemo, useState } from 'react';
import { Check, Heart, Search, SlidersHorizontal, Star, X } from 'lucide-react';
import { CATEGORIES } from '../data/storeData';
import { Product, ProductCategory, ProductVariant, SortOption } from '../types/store';
import { ResilientImage } from './ResilientImage';

interface CatalogSectionProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, variant: ProductVariant) => void;
}

export function CatalogSection({
  products,
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd,
}: CatalogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const list = products.filter((product) => {
      if (showSavedOnly && !wishlistIds.includes(product.id)) {
        return false;
      }
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      if (query) {
        const hay = `${product.name} ${product.category} ${product.material} ${product.shortDescription}`.toLowerCase();
        return hay.includes(query);
      }
      return true;
    });

    const sorted = [...list];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case 'featured':
      default:
        sorted.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
        break;
    }
    return sorted;
  }, [products, selectedCategory, showSavedOnly, wishlistIds, searchQuery, sortBy]);

  const handleQuickAdd = (product: Product) => {
    onQuickAdd(product, product.variants[0]);
    setJustAddedId(product.id);
    window.setTimeout(() => {
      setJustAddedId((curr) => (curr === product.id ? null : curr));
    }, 1200);
  };

  return (
    <section id="catalog" className="py-14 lg:py-20 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div id="collections" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-medium text-zinc-500 mb-2">
              Storefront Catalog · {products.length} Curated Objects
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950">
              Featured Studio Collection
            </h2>
          </div>

          <p className="text-sm text-zinc-600 max-w-md">
            Test promo code{' '}
            <span className="font-medium text-zinc-950 tabular-nums">KALEEMULLAH10</span>{' '}
            inside the bag drawer for an instant 10% client preview discount.
          </p>
        </div>

        {/* Interactive Filter Toolbar */}
        <div className="bg-white border border-zinc-200 rounded-xl p-4 mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Segmented Category Buttons */}
            <div
              role="tablist"
              aria-label="Filter by product category"
              className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0"
            >
              {CATEGORIES.map((category) => {
                const active = selectedCategory === category && !showSavedOnly;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowSavedOnly(false);
                    }}
                    className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                      active
                        ? 'bg-zinc-950 text-white'
                        : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-950'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setShowSavedOnly((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                  showSavedOnly
                    ? 'bg-zinc-950 text-white'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-950'
                }`}
              >
                <Heart
                  className="w-3.5 h-3.5"
                  strokeWidth={1.75}
                  fill={showSavedOnly ? 'currentColor' : 'none'}
                />
                <span>Saved</span>
                <span className="tabular-nums">({wishlistIds.length})</span>
              </button>
            </div>

            {/* Search & Sort Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <div className="relative flex-1 sm:w-64">
                <Search
                  className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  strokeWidth={1.75}
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search lamps, watches, materials..."
                  aria-label="Search products"
                  className="w-full pl-9 pr-8 py-2 text-sm text-zinc-950 bg-zinc-50 border border-zinc-200 rounded-lg placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:border-zinc-950 transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="relative flex items-center">
                <SlidersHorizontal
                  className="w-4 h-4 text-zinc-500 absolute left-3 pointer-events-none"
                  strokeWidth={1.75}
                />
                <select
                  aria-label="Sort products"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full sm:w-auto pl-9 pr-8 py-2 text-sm font-medium text-zinc-800 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white focus:border-zinc-950 cursor-pointer"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-zinc-200 rounded-xl p-12 text-center">
            <h3 className="font-display text-lg font-semibold text-zinc-950">
              No matching products found
            </h3>
            <p className="mt-2 text-sm text-zinc-600 max-w-md mx-auto">
              {showSavedOnly
                ? 'You have not saved any products yet. Tap the heart button on any item to bookmark it here.'
                : 'Try adjusting your search keywords or resetting the active category filter.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setShowSavedOnly(false);
                setSearchQuery('');
              }}
              className="mt-6 inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-zinc-950 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => {
              const isSaved = wishlistIds.includes(product.id);
              const isAdded = justAddedId === product.id;

              return (
                <article
                  key={product.id}
                  className="group bg-white border border-zinc-200 rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  {/* 4:3 Studio Image Container */}
                  <div className="relative aspect-[4/3] bg-zinc-100 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="w-full h-full block text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-700"
                      aria-label={`View details for ${product.name}`}
                    >
                      <ResilientImage
                        src={product.image}
                        alt={product.imageAlt}
                        fallbackTitle={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleWishlist(product.id)}
                      aria-label={isSaved ? `Remove ${product.name} from saved` : `Save ${product.name}`}
                      aria-pressed={isSaved}
                      className="absolute top-3 right-3 w-10 h-10 rounded-lg bg-white/95 border border-zinc-200 flex items-center justify-center text-zinc-700 hover:text-zinc-950 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                    >
                      <Heart
                        className={`w-4 h-4 ${isSaved ? 'text-rose-600' : 'text-zinc-700'}`}
                        strokeWidth={1.75}
                        fill={isSaved ? 'currentColor' : 'none'}
                      />
                    </button>
                  </div>

                  {/* Clean Metadata & Purchase Footer */}
                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex items-center justify-between gap-2 text-xs text-zinc-500">
                        <span className="truncate">
                          {product.category} · {product.stockStatus}
                        </span>
                        <span className="inline-flex items-center gap-1 tabular-nums text-zinc-700 shrink-0">
                          <Star className="w-3.5 h-3.5 text-amber-500" fill="currentColor" strokeWidth={1.5} />
                          {product.rating.toFixed(1)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="mt-2 block text-left w-full cursor-pointer focus-visible:outline-none focus-visible:underline"
                      >
                        <h3 className="font-display text-base font-semibold text-zinc-950 group-hover:text-blue-700 transition-colors">
                          {product.name}
                        </h3>
                      </button>

                      <p className="mt-1.5 text-sm text-zinc-600 line-clamp-2 leading-relaxed">
                        {product.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[15px] font-semibold text-zinc-950 tabular-nums">
                          ${product.price}
                        </span>
                        <p className="text-xs text-zinc-500">
                          {product.variants.length} finishes
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onSelectProduct(product)}
                          className="px-3 py-2 text-xs font-medium text-zinc-700 bg-zinc-100 rounded-lg hover:bg-zinc-200 hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                        >
                          Quick View
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQuickAdd(product)}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                            isAdded
                              ? 'bg-emerald-700 text-white'
                              : 'bg-zinc-950 text-white hover:bg-zinc-800'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" strokeWidth={2} />
                              <span>Added</span>
                            </>
                          ) : (
                            <span>Add to Bag</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
