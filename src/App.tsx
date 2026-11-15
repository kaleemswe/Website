import { useEffect, useState } from 'react';
import { CartCheckoutDrawer } from './components/CartCheckoutDrawer';
import { CatalogSection } from './components/CatalogSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PortfolioSection } from './components/PortfolioSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PRODUCTS } from './data/storeData';
import {
  CartItem,
  OrderReceipt,
  Product,
  ProductVariant,
} from './types/store';

const CART_STORAGE_KEY = 'kalleem_store_cart_v1';
const WISHLIST_STORAGE_KEY = 'kalleem_store_wishlist_v1';
const ORDERS_STORAGE_KEY = 'kalleem_store_orders_v1';

function readStoredJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() =>
    readStoredJson<CartItem[]>(CART_STORAGE_KEY, [])
  );
  const [wishlistIds, setWishlistIds] = useState<string[]>(() =>
    readStoredJson<string[]>(WISHLIST_STORAGE_KEY, [])
  );
  const [recentOrders, setRecentOrders] = useState<OrderReceipt[]>(() =>
    readStoredJson<OrderReceipt[]>(ORDERS_STORAGE_KEY, [])
  );

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(recentOrders));
    } catch {
      // Ignore storage quota errors
    }
  }, [recentOrders]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (
    product: Product,
    variant: ProductVariant,
    quantity = 1
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id && item.variant.id === variant.id
      );

      if (existingIndex >= 0) {
        return prev.map((item, idx) =>
          idx === existingIndex
            ? {
                ...item,
                quantity: Math.min(product.stockCount, item.quantity + quantity),
              }
            : item
        );
      }

      return [...prev, { product, variant, quantity }];
    });
  };

  const handleUpdateQuantity = (
    productId: string,
    variantId: string,
    delta: number
  ) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.variant.id === variantId) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            return {
              ...item,
              quantity: Math.min(item.product.stockCount, nextQty),
            };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (productId: string, variantId: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && item.variant.id === variantId)
      )
    );
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleCompleteOrder = (receipt: OrderReceipt) => {
    setRecentOrders((prev) => [receipt, ...prev].slice(0, 10));
    setCart([]);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-950">
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setCartDrawerOpen(true)}
      />

      <main className="flex-1">
        <Hero
          onBrowseCatalog={() => scrollToSection('catalog')}
          onViewPortfolio={() => scrollToSection('portfolio')}
        />

        <CatalogSection
          products={PRODUCTS}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onQuickAdd={(product, variant) => handleAddToCart(product, variant, 1)}
        />

        <PortfolioSection />
      </main>

      <Footer />

      <ProductDetailModal
        product={selectedProduct}
        isSaved={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onClose={() => setSelectedProduct(null)}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={(product, variant, qty) => {
          handleAddToCart(product, variant, qty);
          setCartDrawerOpen(true);
        }}
      />

      <CartCheckoutDrawer
        isOpen={cartDrawerOpen}
        items={cart}
        recentOrders={recentOrders}
        onClose={() => setCartDrawerOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCompleteOrder={handleCompleteOrder}
      />
    </div>
  );
}
