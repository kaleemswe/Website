export type ProductCategory =
  | 'All'
  | 'Lighting'
  | 'Timepieces'
  | 'Audio'
  | 'Ceramics'
  | 'Carry'
  | 'Workspace';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export interface ProductVariant {
  id: string;
  name: string;
  hex: string;
  priceDelta?: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: Exclude<ProductCategory, 'All'>;
  material: string;
  price: number;
  rating: number;
  reviewCount: number;
  stockStatus: 'In Stock' | 'Limited Run';
  stockCount: number;
  shortDescription: string;
  description: string;
  image: string;
  imageAlt: string;
  variants: ProductVariant[];
  specs: ProductSpec[];
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export type PaymentMethod = 'card' | 'cod';

export interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface OrderReceipt {
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  promoCode: string | null;
  paymentMethod: PaymentMethod;
  shippingDetails: ShippingDetails;
}

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  summary: string;
  deliverables: string[];
  outcome: string;
  image: string;
  imageAlt: string;
  stack: string[];
}
