export interface ProductVariant {
  id: string;
  name: string; // e.g. "4S + 1SK"
  material?: string;
  colour?: string;
  finish?: string;
  wattage?: string;
  size?: string;
  length?: string;
  capacity?: string;
  channels?: string;
  gang?: string;
  smart: boolean;
  sku: string;
  price: number;
  originalPrice: number;
  stock: number;
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
  subcategoryId?: string;
  shortDescription: string;
  description: string;
  images: string[];
  variants: ProductVariant[];
  price: number; // base selling price
  originalPrice: number; // base original price
  discountPercentage: number;
  stock: number;
  status: 'Active' | 'Inactive' | 'Draft' | 'Out of Stock';
  featured: boolean;
  cataloguePage?: number;
  createdAt: string;
  updatedAt: string;
  features?: string[];
  specifications?: Record<string, string>;
  compatibility?: string[];
  applications?: string[];
  warranty?: string;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId?: string;
  displayOrder: number;
  active: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  variantId?: string;
  variantName?: string;
  quantity: number;
  price: number;
  discount: number;
  image?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shippingFee: number;
  discount: number;
  total: number;
  orderStatus: 'Pending Payment' | 'Paid' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';
  paymentStatus: 'Pending' | 'Authorized' | 'Captured' | 'Failed' | 'Refunded';
  paymentProvider: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  paymentDate?: string;
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

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
  active: boolean;
  createdAt: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  thumbnail: string;
  category: string;
  displayOrder: number;
  active: boolean;
  createdAt: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  type: 'Product' | 'Category' | 'Order' | 'Shipping';
  targetId?: string; // product ID or category ID
  discountType: 'Percentage' | 'Fixed';
  discountValue: number;
  couponCode?: string;
  startDate: string;
  endDate: string;
  active: boolean;
  createdAt: string;
}

export interface SEOConfig {
  page: string; // 'Home' | 'Catalogue' | 'Categories' | 'Products' | 'Solutions' | 'Projects' | 'About' | 'Contact'
  title: string;
  metaDescription: string;
  keywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  robotsIndex: boolean;
}

export interface ActivityLog {
  id: string;
  adminEmail: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'Super Admin' | 'Catalogue Manager' | 'Order Manager';
  active: boolean;
  createdAt: string;
}

export interface HomepageConfig {
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  heroButtonText: string;
  heroButtonDestination: string;
  promotionalText: string;
  bannerImage: string;
  bannerLink: string;
}

export interface SystemSettings {
  businessName: string;
  businessEmail: string;
  phone: string;
  whatsappNumber: string;
  address: string;
  socialFacebook: string;
  socialInstagram: string;
  socialYoutube: string;
  currency: string;
  taxRate: number;
  shippingFeeBase: number;
  lowStockThreshold: number;
}
