/**
 * Unified E-Commerce & Smart Home Types
 * Acts as the single source of truth across Storefront & Admin
 */

export interface ProductSpecification {
  key: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  originalPrice?: number;
  stock: number;
  smart?: boolean;
  material?: string;
  colour?: string;
  finish?: string;
  wattage?: string;
  size?: string;
  channels?: string;
  gang?: string;
  image?: string;
  specifications?: Record<string, string>;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  brand: string;
  categoryId: string;
  categoryName?: string;
  subcategoryId?: string;
  subcategoryName?: string;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice?: number;
  salePrice?: number;
  priceOnRequest?: boolean;
  discountPercentage?: number;
  stock: number;
  status: 'Active' | 'Inactive' | 'Draft' | 'Out of Stock' | 'active' | 'draft';
  featured: boolean;
  isFeatured?: boolean;
  images: string[];
  image?: string;
  variants: ProductVariant[];
  specifications: ProductSpecification[];
  specificationsMap?: Record<string, string>;
  features?: string[];
  compatibility?: string[];
  applications?: string[];
  warranty?: string;
  tags?: string[];
  cataloguePage?: number;
  protocol?: string;
  supportedProtocols?: string[];
  controlMethods?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  sortOrder: number;
  displayOrder?: number;
  active: boolean;
  featured?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  variantId?: string;
  variantName?: string;
  quantity: number;
  price: number;
  discount?: number;
  image?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address?: string;
  city?: string;
  shippingAddress?: {
    street: string;
    city: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  items: OrderItem[];
  subtotal?: number;
  tax?: number;
  shippingFee?: number;
  discount?: number;
  totalAmount: number;
  orderStatus: 'Pending Payment' | 'Paid' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';
  paymentStatus: 'Pending' | 'Paid' | 'Authorized' | 'Captured' | 'Failed' | 'Refunded';
  paymentProvider?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  paymentSignature?: string;
  notes?: string;
  type?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  numberForOrders: number;
  totalPurchaseValue: number;
  lastOrderDate?: string;
  accountStatus: 'Active' | 'Suspended';
  createdAt: string;
  addresses?: Array<{
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  }>;
}

export interface Offer {
  id: string;
  title: string;
  code: string;
  description: string;
  discountType: 'Percentage' | 'Fixed';
  discountValue: number;
  discountPercentage?: number;
  startDate?: string;
  endDate?: string;
  expiryDate?: string;
  active: boolean;
  isActive?: boolean;
  bannerImage?: string;
  createdAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  displayOrder?: number;
  active: boolean;
  createdAt: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  youtubeId?: string;
  thumbnail: string;
  thumbnailUrl?: string;
  category: string;
  displayOrder?: number;
  active: boolean;
  createdAt: string;
}

export interface HomepageConfig {
  heroTitle: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroImage: string;
  heroButtonText?: string;
  heroButtonDestination?: string;
  promotionalText?: string;
  bannerImage?: string;
  bannerLink?: string;
}

export interface SystemSettings {
  businessName: string;
  businessEmail: string;
  phone: string;
  whatsappNumber: string;
  address: string;
  currency: string;
  taxRate: number;
  shippingFeeBase: number;
  lowStockThreshold: number;
  socialFacebook?: string;
  socialInstagram?: string;
  socialYoutube?: string;
}

export interface SEOConfig {
  page: string;
  title: string;
  metaDescription: string;
  keywords: string;
  ogImage?: string;
  canonicalUrl?: string;
}
