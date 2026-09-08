/**
 * Smart Home Automation & Architectural Systems - Type Definitions
 * Based on Comprehensive Product Catalogue & Reference Architecture
 */

export interface ProductSpecification {
  key: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku?: string;
  specifications?: string;
  price?: number; // Optional catalogue price if explicitly available
  originalPrice?: number;
  images?: string[];
  isDefault?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  categoryId: string;
  categoryName?: string;
  subcategoryId?: string;
  subcategoryName?: string;
  brand?: string;
  price?: number; // Optional catalogue price or null (Price on Request)
  salePrice?: number;
  priceOnRequest?: boolean;
  shortDescription: string;
  description: string;
  images: string[];
  image?: string; // fallback single image
  features?: string[];
  specifications: ProductSpecification[];
  variants?: ProductVariant[];
  colors?: string[];
  bodyColors?: string[];
  reflectorColors?: string[];
  wattage?: string;
  dimensions?: string;
  cutout?: string;
  beamAngle?: string;
  protocol?: string; // 'Zigbee 3.0' | 'Wi-Fi' | 'Bluetooth' | 'Matter' | 'Thread' | 'Apple HomeKit' | 'Wired' | string
  supportedProtocols?: string[];
  controlMethods?: string[]; // 'App Control', 'Voice Control', 'Touch', 'Manual', 'Remote', 'Rotary Knob'
  isSmart?: boolean;
  applications?: string[];
  installationNotes?: string;
  compatibility?: string[];
  status: 'active' | 'draft';
  isFeatured?: boolean;
  featured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  rating?: number;
  reviewCount?: number;
  stock?: number;
  warranty?: string;
  manualUrl?: string;
  relatedProductIds?: string[];
  viewsCount?: number;
  reviews?: any[];
  cataloguePage?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  sortOrder: number;
  isPublished?: boolean;
  productCount?: number;
  subcategories?: { id: string; name: string; slug: string }[];
  createdAt: string;
}

export interface SolutionService {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  galleryImages?: string[];
  iconName: string;
  keyFeatures: string[];
  applications: string[];
  benefits: string[];
  relatedCategoryIds?: string[];
  relatedProductIds?: string[];
  sortOrder: number;
  isFeatured?: boolean;
}

export interface ProjectApplication {
  id: string;
  title: string;
  slug: string;
  category?: 'Residential' | 'Luxury Villa' | 'Smart Apartment' | 'Commercial' | 'Office' | 'Hospitality' | 'Industrial' | 'Security' | 'Lighting' | 'Entertainment' | 'Entrance Automation' | string;
  location?: string;
  propertyType?: string;
  solutionCategories?: string[];
  description?: string;
  heroImage?: string;
  image?: string;
  systems?: string[];
  galleryImages?: string[];
  technologies?: string[];
  highlights?: string[];
  client?: string;
  completionDate?: string;
  sqft?: number;
  estimatedCostINR?: string;
  sortOrder?: number;
  youtubeUrl?: string;
  isFeatured?: boolean;
  projectType?: string;
  completionYear?: string;
  shortDescription?: string;
  overview?: string;
}

export type Project = ProjectApplication;

export interface OrderEnquiry {
  id: string;
  enquiryNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  city?: string;
  propertyType?: string;
  productOrSolution?: string;
  quantity?: number | string;
  projectSize?: string;
  preferredContactMethod?: 'WhatsApp' | 'Phone Call' | 'Email';
  message?: string;
  sourceProductId?: string;
  sourceProductName?: string;
  sourceSku?: string;
  type?: 'product_inquiry' | 'project_consultation' | 'cart_quote' | 'configurator_proposal' | 'configurator' | 'consultation' | string;
  items?: { productId: string; productName: string; sku: string; quantity: number; price: number; image?: string }[];
  totalAmount?: number;
  address?: string;
  notes?: string;
  consultationType?: string;
  preferredDate?: string;
  preferredTime?: string;
  propertySize?: string;
  automationTier?: string;
  selectedSystems?: string[];
  estimatedRange?: { min: number; max: number };
  status: 'new' | 'contacted' | 'in_progress' | 'closed' | 'completed' | 'cancelled';
  paymentStatus?: 'Pending' | 'Payment Initiated' | 'Paid' | 'Failed' | 'Cancelled' | 'Refunded';
  paymentOrderId?: string;
  paymentId?: string;
  paymentSignature?: string;
  orderType?: 'enquiry' | 'purchase';
  isArchived?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  youtubeUrl: string;
  youtubeId: string;
  description: string;
  category: 'Product Demonstrations' | 'Smart Home Walkthroughs' | 'Lighting' | 'Security' | 'Entertainment' | 'Automation' | 'Installation' | 'Project Videos' | string;
  isFeatured?: boolean;
  thumbnailUrl?: string;
  duration?: string;
  createdAt: string;
  playlist?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'retrofit' | 'switches' | 'lighting' | 'security' | 'protocols' | 'commercial' | string;
}

export interface Offer {
  id: string;
  title: string;
  code: string;
  discountPercentage: number;
  description: string;
  expiryDate: string;
  bannerImage?: string;
  isActive: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company?: string;
  comment: string;
  rating: number;
  avatar?: string;
  projectType?: string;
  isFeatured?: boolean;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

export interface SiteContent {
  businessName: string;
  tagline: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  workingHours: string;
  aboutText: string;
  aboutMission: string;
  aboutVision: string;
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  logoUrl?: string;
  faviconUrl?: string;
  primaryColor?: string;
  googleMapsUrl?: string;
  privacyPolicy?: string;
  termsAndConditions?: string;
}

export interface SeoSettings {
  pageTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  canonicalUrl: string;
  robotsIndex: boolean;
  schemaJson: string;
  googleAnalyticsId: string;
  googleSearchConsoleVerification: string;
}

export interface BackupItem {
  id: string;
  timestamp: string;
  label: string;
  sizeKb: number;
  data: any;
}

export interface ActivityLog {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  type: 'product' | 'category' | 'service' | 'enquiry' | 'system' | 'security';
}

export interface ConfiguratorSettings {
  baseSquareFootRateINR: number;
  roomCostDefaults: Record<string, number>;
  systemFactorMultipliers: Record<string, number>;
  tierMultipliers: Record<string, number>;
  propertyTypeDefaults: Record<string, { typicalRooms: string[]; defaultSqft: number }>;

  // Rich configurator fields used by the UI
  baseHardwareRate: number;
  installationRatePercentage: number;
  availableRooms: { id: string; name: string; costPerUnit: number; defaultCount: number }[];
  availableSystems: { id: string; name: string; category: string; costPerSqFt: number; description: string }[];
  tiers: { id: string; name: string; multiplier: number; tagline: string; features: string[] }[];
  propertyTypes: { id: string; name: string; description: string; multiplier: number }[];
  sizeRanges: { id: string; name: string; avgSqFt: number }[];
}

export interface ProposalData {
  referenceNumber: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  location?: string;
  date?: string;
  propertyType?: string;
  propertySize?: string;
  automationTier?: string;
  consultationType?: string;
  notes?: string;
  roomsBreakdown?: { name: string; count: number }[];
  items?: { name: string; category?: string; specifications?: string; quantity: number; unitPrice: number; totalPrice: number }[];
  systemsIncluded?: string[];
  subtotal: number;
  installationEstimate: number;
  totalAmount: number;
  estimatedTotalMin?: number;
  estimatedTotalMax?: number;
  validUntil?: string;
}
