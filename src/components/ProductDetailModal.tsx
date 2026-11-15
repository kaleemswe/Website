import { useEffect, useState } from 'react';
import { Heart, Minus, Plus, ShieldCheck, Star, Truck, X } from 'lucide-react';
import { Product, ProductVariant } from '../types/store';
import { ResilientImage } from './ResilientImage';

interface ProductDetailModalProps {
  product: Product | null;
  isSaved: boolean;
  onClose: () => void;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
}

export function ProductDetailModal({
  product,
  isSaved,
  onClose,
  onToggleWishlist,
  onAddToCart,
}: ProductDetailModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0]);
      setQuantity(1);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product || !selectedVariant) return null;

  const unitPrice = product.price + (selectedVariant.priceDelta ?? 0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-zinc-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-lg bg-white/95 border border-zinc-200 flex items-center justify-center text-zinc-700 hover:text-zinc-950 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
        >
          <X className="w-5 h-5" strokeWidth={1.75} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left: Product Visual */}
          <div className="md:col-span-6 bg-zinc-100 p-4 sm:p-6 flex flex-col justify-between">
            <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-white border border-zinc-200">
              <ResilientImage
                src={product.image}
                alt={product.imageAlt}
                fallbackTitle={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-zinc-600">
              <div className="flex items-start gap-2 bg-white border border-zinc-200 rounded-lg p-3">
                <Truck className="w-4 h-4 text-zinc-900 shrink-0 mt-0.5" strokeWidth={1.75} />
                <span>Free express shipping on orders over $250</span>
              </div>
              <div className="flex items-start gap-2 bg-white border border-zinc-200 rounded-lg p-3">
                <ShieldCheck className="w-4 h-4 text-zinc-900 shrink-0 mt-0.5" strokeWidth={1.75} />
                <span>30-day return & hardware warranty included</span>
              </div>
            </div>
          </div>

          {/* Right: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span>{product.category}</span>
                <span aria-hidden="true">·</span>
                <span>SKU {product.sku}</span>
                <span aria-hidden="true">·</span>
                <span className="text-zinc-700 font-medium">{product.stockCount} available</span>
              </div>

              <h2
                id="pdp-modal-title"
                className="mt-2 font-display text-2xl font-semibold text-zinc-950"
              >
                {product.name}
              </h2>

              <div className="mt-3 flex items-center justify-between gap-4">
                <span className="font-display text-2xl font-semibold text-zinc-950 tabular-nums">
                  ${unitPrice}
                </span>

                <div className="inline-flex items-center gap-1.5 text-sm text-zinc-700 tabular-nums">
                  <Star className="w-4 h-4 text-amber-500" fill="currentColor" strokeWidth={1.5} />
                  <span className="font-medium text-zinc-950">{product.rating.toFixed(1)}</span>
                  <span className="text-zinc-500">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <p className="mt-4 text-sm text-zinc-600 leading-relaxed">
                {product.description}
              </p>

              {/* Variant Selector */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="font-medium text-zinc-700">Finish</span>
                  <span className="text-zinc-950 font-medium">{selectedVariant.name}</span>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  {product.variants.map((variant) => {
                    const active = variant.id === selectedVariant.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariant(variant)}
                        className={`inline-flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                          active
                            ? 'border-zinc-950 bg-zinc-950 text-white'
                            : 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                          style={{ backgroundColor: variant.hex }}
                          aria-hidden="true"
                        />
                        <span>{variant.name}</span>
                        {variant.priceDelta ? (
                          <span className="tabular-nums opacity-80">+${variant.priceDelta}</span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Specifications List */}
              <dl className="mt-6 pt-5 border-t border-zinc-200 space-y-2.5 text-xs">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex items-baseline justify-between gap-4">
                    <dt className="text-zinc-500 shrink-0">{spec.label}</dt>
                    <dd className="text-zinc-900 font-medium text-right">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Quantity & Primary Purchase Actions */}
            <div className="pt-5 border-t border-zinc-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="inline-flex items-center justify-between border border-zinc-200 rounded-lg bg-zinc-50 px-2 h-11">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-8 h-8 flex items-center justify-center text-zinc-700 hover:text-zinc-950 cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-medium text-zinc-950 tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                  aria-label="Increase quantity"
                  className="w-8 h-8 flex items-center justify-center text-zinc-700 hover:text-zinc-950 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  onAddToCart(product, selectedVariant, quantity);
                  onClose();
                }}
                className="flex-1 h-11 px-5 text-sm font-medium text-white bg-zinc-950 rounded-lg hover:bg-zinc-800 active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
              >
                Add to Bag · <span className="tabular-nums">${unitPrice * quantity}</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleWishlist(product.id)}
                aria-label={isSaved ? 'Remove from saved items' : 'Save item'}
                className="h-11 px-3.5 border border-zinc-200 rounded-lg flex items-center justify-center text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                <Heart
                  className={`w-4 h-4 ${isSaved ? 'text-rose-600' : 'text-zinc-700'}`}
                  strokeWidth={1.75}
                  fill={isSaved ? 'currentColor' : 'none'}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
