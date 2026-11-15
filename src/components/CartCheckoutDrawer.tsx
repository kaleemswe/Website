import { FormEvent, useEffect, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import {
  FREE_SHIPPING_THRESHOLD,
  PROMO_CODES,
  STANDARD_SHIPPING_FEE,
} from '../data/storeData';
import {
  CartItem,
  OrderReceipt,
  PaymentMethod,
  ShippingDetails,
} from '../types/store';
import { ResilientImage } from './ResilientImage';

interface CartCheckoutDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  recentOrders: OrderReceipt[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, variantId: string, delta: number) => void;
  onRemoveItem: (productId: string, variantId: string) => void;
  onCompleteOrder: (receipt: OrderReceipt) => void;
}

type DrawerStep = 'cart' | 'checkout' | 'receipt';

const INITIAL_SHIPPING: ShippingDetails = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
};

export function CartCheckoutDrawer({
  isOpen,
  items,
  recentOrders,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCompleteOrder,
}: CartCheckoutDrawerProps) {
  const [step, setStep] = useState<DrawerStep>('cart');
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoMessage, setPromoMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>(INITIAL_SHIPPING);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [formError, setFormError] = useState<string | null>(null);
  const [latestReceipt, setLatestReceipt] = useState<OrderReceipt | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && items.length > 0 && step === 'receipt' && !latestReceipt) {
      setStep('cart');
    }
  }, [isOpen, items.length, step, latestReceipt]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => {
    const unit = item.product.price + (item.variant.priceDelta ?? 0);
    return sum + unit * item.quantity;
  }, 0);

  const discountRate = appliedPromo ? PROMO_CODES[appliedPromo]?.rate ?? 0 : 0;
  const discount = Math.round(subtotal * discountRate * 100) / 100;
  const discountedSubtotal = Math.max(0, subtotal - discount);
  const qualifiesFreeShipping = discountedSubtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0;
  const shippingFee = qualifiesFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const total = Math.round((discountedSubtotal + shippingFee) * 100) / 100;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - discountedSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((discountedSubtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleApplyPromo = (e: FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      setPromoMessage({ type: 'ok', text: `${PROMO_CODES[code].label} applied.` });
    } else {
      setPromoMessage({ type: 'err', text: 'Invalid code. Try KALEEMULLAH10.' });
    }
  };

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const { fullName, email, phone, address, city, postalCode } = shippingDetails;
    if (!fullName.trim() || !email.trim() || !phone.trim() || !address.trim() || !city.trim() || !postalCode.trim()) {
      setFormError('Please complete all required shipping fields before placing your order.');
      return;
    }

    const orderNumber = `KL-${Math.floor(1000 + Math.random() * 9000)}`;
    const receipt: OrderReceipt = {
      orderNumber,
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      items: [...items],
      subtotal,
      discount,
      shipping: shippingFee,
      total,
      promoCode: appliedPromo,
      paymentMethod,
      shippingDetails: { ...shippingDetails },
    };

    setLatestReceipt(receipt);
    onCompleteOrder(receipt);
    setStep('receipt');
    setShippingDetails(INITIAL_SHIPPING);
    setAppliedPromo(null);
    setPromoInput('');
    setPromoMessage(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-zinc-950/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag and Checkout"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white h-full flex flex-col border-l border-zinc-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => setStep('cart')}
                aria-label="Back to bag"
                className="w-9 h-9 rounded-lg border border-zinc-200 flex items-center justify-center text-zinc-700 hover:bg-zinc-100 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className="font-display text-lg font-semibold text-zinc-950">
              {step === 'cart' && `Shopping Bag (${items.reduce((s, i) => s + i.quantity, 0)})`}
              {step === 'checkout' && 'Checkout Details'}
              {step === 'receipt' && 'Order Confirmed'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close bag drawer"
            className="w-10 h-10 rounded-lg flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-500 mb-4">
                    <ShoppingBag className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display text-base font-semibold text-zinc-950">
                    Your bag is currently empty
                  </h3>
                  <p className="mt-1.5 text-sm text-zinc-600 max-w-xs mx-auto">
                    Add any item from the catalog to test cart math, promo codes, and checkout.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 px-5 py-2.5 text-sm font-medium text-white bg-zinc-950 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    Browse Products
                  </button>

                  {recentOrders.length > 0 && (
                    <div className="mt-10 pt-6 border-t border-zinc-200 text-left">
                      <h4 className="font-display text-sm font-semibold text-zinc-950 mb-3">
                        Recent Test Orders
                      </h4>
                      <div className="space-y-2.5">
                        {recentOrders.slice(0, 3).map((order) => (
                          <button
                            key={order.orderNumber}
                            type="button"
                            onClick={() => {
                              setLatestReceipt(order);
                              setStep('receipt');
                            }}
                            className="w-full flex items-center justify-between p-3 rounded-lg border border-zinc-200 hover:border-zinc-400 text-left transition-colors cursor-pointer"
                          >
                            <div>
                              <p className="text-sm font-medium text-zinc-950 tabular-nums">
                                Order #{order.orderNumber}
                              </p>
                              <p className="text-xs text-zinc-500">
                                {order.createdAt} · {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card'}
                              </p>
                            </div>
                            <span className="text-sm font-semibold text-zinc-950 tabular-nums">
                              ${order.total.toFixed(2)}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Free Shipping Progress */}
                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                    <div className="flex items-center justify-between text-xs font-medium text-zinc-700 mb-2">
                      <span className="inline-flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-zinc-900" strokeWidth={1.75} />
                        {qualifiesFreeShipping
                          ? 'Unlocked complimentary express shipping'
                          : `Add $${amountToFreeShipping.toFixed(0)} more for free express shipping`}
                      </span>
                      <span className="tabular-nums">{freeShippingProgress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-zinc-950 transition-all duration-300"
                        style={{ width: `${freeShippingProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Itemized Cart List */}
                  <ul className="divide-y divide-zinc-200">
                    {items.map((item) => {
                      const unitPrice = item.product.price + (item.variant.priceDelta ?? 0);
                      return (
                        <li
                          key={`${item.product.id}-${item.variant.id}`}
                          className="py-4 flex gap-4"
                        >
                          <div className="w-24 aspect-[4/3] rounded-lg overflow-hidden bg-zinc-100 border border-zinc-200 shrink-0">
                            <ResilientImage
                              src={item.product.image}
                              alt={item.product.imageAlt}
                              fallbackTitle={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <h3 className="font-display text-sm font-semibold text-zinc-950 truncate">
                                  {item.product.name}
                                </h3>
                                <p className="text-xs text-zinc-500 mt-0.5">
                                  {item.variant.name}
                                </p>
                              </div>
                              <span className="text-sm font-semibold text-zinc-950 tabular-nums shrink-0">
                                ${(unitPrice * item.quantity).toFixed(2)}
                              </span>
                            </div>

                            <div className="mt-3 flex items-center justify-between">
                              <div className="inline-flex items-center border border-zinc-200 rounded-lg bg-zinc-50">
                                <button
                                  type="button"
                                  onClick={() =>
                                    onUpdateQuantity(item.product.id, item.variant.id, -1)
                                  }
                                  aria-label="Decrease item quantity"
                                  className="w-8 h-8 flex items-center justify-center text-zinc-700 hover:text-zinc-950 cursor-pointer"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-8 text-center text-xs font-medium text-zinc-950 tabular-nums">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    onUpdateQuantity(item.product.id, item.variant.id, 1)
                                  }
                                  aria-label="Increase item quantity"
                                  className="w-8 h-8 flex items-center justify-center text-zinc-700 hover:text-zinc-950 cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => onRemoveItem(item.product.id, item.variant.id)}
                                aria-label={`Remove ${item.product.name}`}
                                className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-rose-600 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Promo Code Form */}
                  <form onSubmit={handleApplyPromo} className="pt-2">
                    <label
                      htmlFor="promo-code-input"
                      className="block text-xs font-medium text-zinc-700 mb-1.5"
                    >
                      Promo Code (try KALEEMULLAH10)
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="promo-code-input"
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Enter promo code"
                        className="flex-1 px-3 py-2 text-sm text-zinc-950 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white focus:border-zinc-950"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 text-xs font-medium text-zinc-950 bg-zinc-100 border border-zinc-200 rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {promoMessage && (
                      <p
                        className={`mt-1.5 text-xs ${
                          promoMessage.type === 'ok' ? 'text-emerald-700' : 'text-rose-600'
                        }`}
                      >
                        {promoMessage.text}
                      </p>
                    )}
                  </form>
                </div>
              )}
            </>
          )}

          {step === 'checkout' && (
            <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-5">
              {formError && (
                <div
                  role="alert"
                  className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700"
                >
                  {formError}
                </div>
              )}

              <div className="space-y-3.5">
                <h3 className="font-display text-sm font-semibold text-zinc-950">
                  Contact & Delivery Address
                </h3>

                <div>
                  <label htmlFor="ship-name" className="block text-xs font-medium text-zinc-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="ship-name"
                    type="text"
                    required
                    value={shippingDetails.fullName}
                    onChange={(e) =>
                      setShippingDetails((s) => ({ ...s, fullName: e.target.value }))
                    }
                    placeholder="Alex Morgan"
                    className="w-full px-3.5 py-2.5 text-sm text-zinc-950 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white focus:border-zinc-950"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="ship-email" className="block text-xs font-medium text-zinc-700 mb-1">
                      Email Address
                    </label>
                    <input
                      id="ship-email"
                      type="email"
                      required
                      value={shippingDetails.email}
                      onChange={(e) =>
                        setShippingDetails((s) => ({ ...s, email: e.target.value }))
                      }
                      placeholder="client@example.com"
                      className="w-full px-3.5 py-2.5 text-sm text-zinc-950 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white focus:border-zinc-950"
                    />
                  </div>
                  <div>
                    <label htmlFor="ship-phone" className="block text-xs font-medium text-zinc-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      id="ship-phone"
                      type="tel"
                      required
                      value={shippingDetails.phone}
                      onChange={(e) =>
                        setShippingDetails((s) => ({ ...s, phone: e.target.value }))
                      }
                      placeholder="+1 (555) 234-5678"
                      className="w-full px-3.5 py-2.5 text-sm text-zinc-950 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white focus:border-zinc-950"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="ship-address" className="block text-xs font-medium text-zinc-700 mb-1">
                    Street Address
                  </label>
                  <input
                    id="ship-address"
                    type="text"
                    required
                    value={shippingDetails.address}
                    onChange={(e) =>
                      setShippingDetails((s) => ({ ...s, address: e.target.value }))
                    }
                    placeholder="420 Market Street, Suite 300"
                    className="w-full px-3.5 py-2.5 text-sm text-zinc-950 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white focus:border-zinc-950"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="ship-city" className="block text-xs font-medium text-zinc-700 mb-1">
                      City
                    </label>
                    <input
                      id="ship-city"
                      type="text"
                      required
                      value={shippingDetails.city}
                      onChange={(e) =>
                        setShippingDetails((s) => ({ ...s, city: e.target.value }))
                      }
                      placeholder="San Francisco"
                      className="w-full px-3.5 py-2.5 text-sm text-zinc-950 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white focus:border-zinc-950"
                    />
                  </div>
                  <div>
                    <label htmlFor="ship-postal" className="block text-xs font-medium text-zinc-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      id="ship-postal"
                      type="text"
                      required
                      value={shippingDetails.postalCode}
                      onChange={(e) =>
                        setShippingDetails((s) => ({ ...s, postalCode: e.target.value }))
                      }
                      placeholder="94105"
                      className="w-full px-3.5 py-2.5 text-sm text-zinc-950 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white focus:border-zinc-950"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="pt-4 border-t border-zinc-200 space-y-3">
                <h3 className="font-display text-sm font-semibold text-zinc-950">
                  Payment Method
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-zinc-950 bg-zinc-50'
                        : 'border-zinc-200 bg-white hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-sm font-medium text-zinc-950">
                      <CreditCard className="w-4 h-4" strokeWidth={1.75} />
                      <span>Card Payment</span>
                    </div>
                    <p className="mt-1 text-xs text-zinc-500">
                      Simulated instant card authorization
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-zinc-950 bg-zinc-50'
                        : 'border-zinc-200 bg-white hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-sm font-medium text-zinc-950">
                      <Truck className="w-4 h-4" strokeWidth={1.75} />
                      <span>Cash on Delivery</span>
                    </div>
                    <p className="mt-1 text-xs text-zinc-500">
                      Pay upon courier verification
                    </p>
                  </button>
                </div>
              </div>
            </form>
          )}

          {step === 'receipt' && latestReceipt && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-2.5 text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 shrink-0" strokeWidth={2} />
                  <h3 className="font-display text-base font-semibold">
                    Order #{latestReceipt.orderNumber} Confirmed — Preparing Shipment
                  </h3>
                </div>
                <p className="mt-2 text-xs text-emerald-800/90 leading-relaxed">
                  Demo confirmation generated for client testing on {latestReceipt.createdAt}. No real payment was charged.
                </p>
              </div>

              <div className="border border-zinc-200 rounded-xl p-4 space-y-3 text-sm">
                <h4 className="font-display font-semibold text-zinc-950">
                  Delivery Summary
                </h4>
                <div className="text-xs text-zinc-600 space-y-1">
                  <p className="font-medium text-zinc-900">
                    {latestReceipt.shippingDetails.fullName}
                  </p>
                  <p>{latestReceipt.shippingDetails.address}</p>
                  <p>
                    {latestReceipt.shippingDetails.city}, {latestReceipt.shippingDetails.postalCode}
                  </p>
                  <p>
                    {latestReceipt.shippingDetails.email} · {latestReceipt.shippingDetails.phone}
                  </p>
                  <p className="pt-1 font-medium text-zinc-800">
                    Payment: {latestReceipt.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card Payment'}
                  </p>
                </div>
              </div>

              <div className="border border-zinc-200 rounded-xl p-4 space-y-3">
                <h4 className="font-display text-sm font-semibold text-zinc-950">
                  Items Ordered
                </h4>
                <ul className="divide-y divide-zinc-100 text-xs">
                  {latestReceipt.items.map((item) => {
                    const unit = item.product.price + (item.variant.priceDelta ?? 0);
                    return (
                      <li
                        key={`${item.product.id}-${item.variant.id}`}
                        className="py-2 flex items-center justify-between gap-2"
                      >
                        <span className="text-zinc-700">
                          {item.quantity} × {item.product.name} ({item.variant.name})
                        </span>
                        <span className="font-medium text-zinc-950 tabular-nums">
                          ${(unit * item.quantity).toFixed(2)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <div className="pt-3 border-t border-zinc-200 space-y-1.5 text-xs">
                  <div className="flex justify-between text-zinc-600">
                    <span>Subtotal</span>
                    <span className="tabular-nums">${latestReceipt.subtotal.toFixed(2)}</span>
                  </div>
                  {latestReceipt.discount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount ({latestReceipt.promoCode})</span>
                      <span className="tabular-nums">-${latestReceipt.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-zinc-600">
                    <span>Shipping</span>
                    <span className="tabular-nums">
                      {latestReceipt.shipping === 0 ? 'Free' : `$${latestReceipt.shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-zinc-200 flex justify-between text-sm font-semibold text-zinc-950">
                    <span>Total</span>
                    <span className="tabular-nums">${latestReceipt.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {step === 'cart' && items.length > 0 && (
          <div className="p-6 border-t border-zinc-200 bg-zinc-50 space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span>
                <span className="tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Promo ({appliedPromo})</span>
                  <span className="tabular-nums">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-600">
                <span>Express Shipping</span>
                <span className="tabular-nums">
                  {shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="pt-2 border-t border-zinc-200 flex justify-between font-display text-base font-semibold text-zinc-950">
                <span>Total</span>
                <span className="tabular-nums">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep('checkout')}
              className="w-full py-3 px-5 text-sm font-medium text-white bg-zinc-950 rounded-lg hover:bg-zinc-800 active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              Proceed to Checkout · <span className="tabular-nums">${total.toFixed(2)}</span>
            </button>
          </div>
        )}

        {step === 'checkout' && (
          <div className="p-6 border-t border-zinc-200 bg-zinc-50 space-y-3">
            <div className="flex justify-between font-display text-base font-semibold text-zinc-950">
              <span>Order Total</span>
              <span className="tabular-nums">${total.toFixed(2)}</span>
            </div>
            <button
              type="submit"
              form="checkout-form"
              className="w-full py-3 px-5 text-sm font-medium text-white bg-zinc-950 rounded-lg hover:bg-zinc-800 active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              Place Test Order
            </button>
          </div>
        )}

        {step === 'receipt' && (
          <div className="p-6 border-t border-zinc-200 bg-zinc-50">
            <button
              type="button"
              onClick={() => {
                setStep('cart');
                onClose();
              }}
              className="w-full py-3 px-5 text-sm font-medium text-white bg-zinc-950 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Continue Browsing Storefront
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
