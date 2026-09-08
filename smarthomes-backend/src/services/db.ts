import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
  Product, 
  Category, 
  Order, 
  Customer, 
  Offer, 
  FAQ, 
  Video, 
  HomepageConfig, 
  SystemSettings, 
  SEOConfig,
  ProductSpecification 
} from '../types/index.js';
import { 
  initialCategories, 
  initialProducts, 
  initialOffers, 
  initialFAQs, 
  initialVideos, 
  initialHomepageConfig, 
  initialSystemSettings, 
  initialSEOConfigs 
} from '../data/seedData.js';
import { eventStream } from './eventStream.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

interface DatabaseSchema {
  products: Product[];
  categories: Category[];
  orders: Order[];
  customers: Customer[];
  offers: Offer[];
  faqs: FAQ[];
  videos: Video[];
  homepage: HomepageConfig;
  settings: SystemSettings;
  seo: SEOConfig[];
  version: number;
  lastUpdated: string;
}

class DatabaseService {
  private state: DatabaseSchema;
  private isWriting: boolean = false;

  constructor() {
    this.state = this.loadDatabase();
  }

  private loadDatabase(): DatabaseSchema {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw) as DatabaseSchema;
        console.log(`[Database] Loaded ${parsed.products?.length || 0} products & ${parsed.categories?.length || 0} categories from db.json`);
        return parsed;
      }
    } catch (err) {
      console.warn('[Database] Error loading db.json, falling back to fresh seed:', err);
    }

    // Default Seed State
    const freshState: DatabaseSchema = {
      products: initialProducts,
      categories: initialCategories,
      orders: [],
      customers: [],
      offers: initialOffers,
      faqs: initialFAQs,
      videos: initialVideos,
      homepage: initialHomepageConfig,
      settings: initialSystemSettings,
      seo: initialSEOConfigs,
      version: 1,
      lastUpdated: new Date().toISOString()
    };

    this.saveToDisk(freshState);
    return freshState;
  }

  private saveToDisk(dataToSave?: DatabaseSchema): void {
    if (this.isWriting) return;
    this.isWriting = true;
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      const payload = dataToSave || this.state;
      payload.lastUpdated = new Date().toISOString();

      // Atomic write using a temporary swap file to prevent file corruption
      const tempFile = `${DB_FILE}.tmp`;
      fs.writeFileSync(tempFile, JSON.stringify(payload, null, 2), 'utf-8');
      fs.renameSync(tempFile, DB_FILE);
    } catch (err) {
      console.error('[Database] Failed to write database to disk:', err);
    } finally {
      this.isWriting = false;
    }
  }

  // --- NORMALIZATION HELPER ---
  public normalizeProduct(raw: Partial<Product>): Product {
    const id = raw.id || `prod-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const name = raw.name || 'Unnamed Luxury Smart Device';
    const slug = raw.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const price = Number(raw.price || raw.salePrice || 0);
    const originalPrice = Number(raw.originalPrice || price);
    const stock = Number(raw.stock ?? 10);

    // Normalize images
    const images: string[] = Array.isArray(raw.images) && raw.images.length > 0 
      ? raw.images 
      : (raw.image ? [raw.image] : ['https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80']);
    
    // Normalize specifications: ensure both array and map exist
    let specifications: ProductSpecification[] = [];
    let specificationsMap: Record<string, string> = {};

    if (Array.isArray(raw.specifications)) {
      specifications = raw.specifications.map(s => {
        if (typeof s === 'object' && s !== null && 'key' in s && 'value' in s) {
          return { key: String(s.key), value: String(s.value) };
        }
        return { key: 'Feature', value: String(s) };
      });
      specifications.forEach(s => {
        specificationsMap[s.key] = s.value;
      });
    } else if (raw.specifications && typeof raw.specifications === 'object') {
      specificationsMap = { ...(raw.specifications as Record<string, string>) };
      specifications = Object.entries(specificationsMap).map(([k, v]) => ({ key: k, value: String(v) }));
    }

    // Resolve Category Name
    const categoryId = raw.categoryId || 'cat-switches';
    const matchedCategory = this.state.categories.find(c => c.id === categoryId);
    const categoryName = raw.categoryName || matchedCategory?.name || 'Smart Home Automation';

    const normalized: Product = {
      id,
      name,
      slug,
      sku: raw.sku || `SKU-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      brand: raw.brand || 'Aetheria Luxury',
      categoryId,
      categoryName,
      subcategoryId: raw.subcategoryId || '',
      subcategoryName: raw.subcategoryName || '',
      shortDescription: raw.shortDescription || raw.description?.slice(0, 150) || 'Architectural smart home element.',
      description: raw.description || raw.shortDescription || 'Bespoke smart automation hardware.',
      price,
      originalPrice,
      salePrice: price,
      priceOnRequest: raw.priceOnRequest || false,
      discountPercentage: originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0,
      stock,
      status: stock <= 0 ? 'Out of Stock' : (raw.status || 'Active'),
      featured: Boolean(raw.featured ?? raw.isFeatured ?? true),
      isFeatured: Boolean(raw.featured ?? raw.isFeatured ?? true),
      images,
      image: images[0],
      variants: Array.isArray(raw.variants) ? raw.variants : [],
      specifications,
      specificationsMap,
      features: Array.isArray(raw.features) ? raw.features : ['Smart App Control', 'Bespoke Finish'],
      compatibility: Array.isArray(raw.compatibility) ? raw.compatibility : ['Apple Home', 'Google Home'],
      applications: Array.isArray(raw.applications) ? raw.applications : ['Residential', 'Luxury Villa'],
      warranty: raw.warranty || '3 Years Comprehensive Warranty',
      tags: Array.isArray(raw.tags) ? raw.tags : ['smart-home', 'luxury'],
      cataloguePage: raw.cataloguePage || 1,
      protocol: raw.protocol || 'Zigbee 3.0 / Matter',
      createdAt: raw.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return normalized;
  }

  // ================= PRODUCTS CRUD =================

  public getProducts(filter?: { categoryId?: string; search?: string; featuredOnly?: boolean; status?: string }): Product[] {
    let result = [...this.state.products];

    if (filter?.categoryId && filter.categoryId !== 'all') {
      result = result.filter(p => p.categoryId === filter.categoryId);
    }

    if (filter?.featuredOnly) {
      result = result.filter(p => p.featured || p.isFeatured);
    }

    if (filter?.status) {
      result = result.filter(p => p.status.toLowerCase() === filter.status!.toLowerCase());
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
      );
    }

    return result;
  }

  public getProductById(id: string): Product | undefined {
    return this.state.products.find(p => p.id === id || p.slug === id);
  }

  public saveProduct(productData: Partial<Product>): Product {
    const normalized = this.normalizeProduct(productData);
    const existingIndex = this.state.products.findIndex(p => p.id === normalized.id);

    if (existingIndex >= 0) {
      this.state.products[existingIndex] = {
        ...this.state.products[existingIndex],
        ...normalized,
        updatedAt: new Date().toISOString()
      };
      eventStream.broadcast('PRODUCT_UPDATED', this.state.products[existingIndex]);
    } else {
      this.state.products.unshift(normalized);
      eventStream.broadcast('PRODUCT_CREATED', normalized);
    }

    this.saveToDisk();
    return normalized;
  }

  public deleteProduct(id: string): boolean {
    const beforeCount = this.state.products.length;
    this.state.products = this.state.products.filter(p => p.id !== id);
    const deleted = this.state.products.length < beforeCount;

    if (deleted) {
      this.saveToDisk();
      eventStream.broadcast('PRODUCT_DELETED', { id });
    }
    return deleted;
  }

  // ================= CATEGORIES CRUD =================

  public getCategories(): Category[] {
    return [...this.state.categories].sort((a, b) => (a.sortOrder || a.displayOrder || 0) - (b.sortOrder || b.displayOrder || 0));
  }

  public saveCategory(categoryData: Partial<Category>): Category {
    const id = categoryData.id || `cat-${Date.now()}`;
    const name = categoryData.name || 'New Category';
    const slug = categoryData.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    const normalized: Category = {
      id,
      name,
      slug,
      description: categoryData.description || '',
      image: categoryData.image || 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
      sortOrder: categoryData.sortOrder || categoryData.displayOrder || this.state.categories.length + 1,
      displayOrder: categoryData.displayOrder || categoryData.sortOrder || this.state.categories.length + 1,
      active: categoryData.active ?? true,
      featured: categoryData.featured ?? false,
      createdAt: categoryData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const existingIndex = this.state.categories.findIndex(c => c.id === id);
    if (existingIndex >= 0) {
      this.state.categories[existingIndex] = normalized;
    } else {
      this.state.categories.push(normalized);
    }

    this.saveToDisk();
    eventStream.broadcast('CATEGORY_MUTATED', normalized);
    return normalized;
  }

  public deleteCategory(id: string): boolean {
    const before = this.state.categories.length;
    this.state.categories = this.state.categories.filter(c => c.id !== id);
    const changed = this.state.categories.length < before;
    if (changed) {
      this.saveToDisk();
      eventStream.broadcast('CATEGORY_MUTATED', { id, deleted: true });
    }
    return changed;
  }

  // ================= ORDERS & INVENTORY =================

  public getOrders(): Order[] {
    return [...this.state.orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getOrderById(id: string): Order | undefined {
    return this.state.orders.find(o => o.id === id || o.orderNumber === id);
  }

  public createOrder(orderInput: Partial<Order>): Order {
    const id = orderInput.id || `ord-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const orderNumber = orderInput.orderNumber || `ATH-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Decrement inventory atomically
    if (Array.isArray(orderInput.items)) {
      for (const item of orderInput.items) {
        const prod = this.state.products.find(p => p.id === item.productId);
        if (prod) {
          const qty = Number(item.quantity) || 1;
          prod.stock = Math.max(0, prod.stock - qty);
          if (prod.stock === 0) {
            prod.status = 'Out of Stock';
          }
        }
      }
    }

    const totalAmount = Number(orderInput.totalAmount || (orderInput as any).total || 0);
    const subtotal = Number(orderInput.subtotal || Math.round(totalAmount / 1.18));
    const tax = Number((orderInput as any).tax || (totalAmount - subtotal));
    const shippingFee = Number((orderInput as any).shippingFee || 0);
    const discount = Number((orderInput as any).discount || 0);

    const shippingAddress = orderInput.shippingAddress || {
      street: orderInput.address || 'Direct Concierge Delivery Destination',
      city: orderInput.city || 'Hyderabad',
      state: 'Telangana',
      postalCode: '500034',
      country: 'India'
    };

    const order: any = {
      id,
      orderNumber,
      customerName: orderInput.customerName || 'Anonymous Customer',
      customerEmail: orderInput.customerEmail || 'client@example.com',
      customerPhone: orderInput.customerPhone || '',
      address: orderInput.address || '',
      city: orderInput.city || '',
      shippingAddress,
      items: orderInput.items || [],
      subtotal,
      tax,
      shippingFee,
      discount,
      total: totalAmount,
      totalAmount,
      orderStatus: orderInput.orderStatus || 'Paid',
      paymentStatus: orderInput.paymentStatus || 'Paid',
      paymentProvider: orderInput.paymentProvider || 'Razorpay',
      razorpayOrderId: orderInput.razorpayOrderId,
      razorpayPaymentId: orderInput.razorpayPaymentId,
      paymentSignature: orderInput.paymentSignature,
      notes: orderInput.notes || '',
      type: orderInput.type || 'purchase',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.state.orders.unshift(order);

    // Update or create customer record
    this.updateCustomerMetrics(order);

    this.saveToDisk();
    eventStream.broadcast('ORDER_PLACED', order);
    eventStream.broadcast('INVENTORY_CHANGED', { products: this.state.products });
    eventStream.broadcast('CUSTOMERS_UPDATED', { customers: this.state.customers });
    return order;
  }

  public updateOrderStatus(id: string, updates: Partial<Order>): Order | undefined {
    const order = this.state.orders.find(o => o.id === id || o.orderNumber === id);
    if (!order) return undefined;

    Object.assign(order, updates, { updatedAt: new Date().toISOString() });
    this.saveToDisk();
    eventStream.broadcast('ORDER_UPDATED', order);
    return order;
  }

  private updateCustomerMetrics(order: Order): void {
    const existing = this.state.customers.find(c => c.email.toLowerCase() === order.customerEmail.toLowerCase());
    if (existing) {
      existing.numberForOrders += 1;
      existing.totalPurchaseValue += order.totalAmount;
      existing.lastOrderDate = new Date().toISOString();
      existing.phone = order.customerPhone || existing.phone;
      if (order.shippingAddress && (!existing.addresses || existing.addresses.length === 0)) {
        existing.addresses = [{
          street: (order.shippingAddress as any).street || order.address || '',
          city: (order.shippingAddress as any).city || order.city || '',
          state: (order.shippingAddress as any).state || '',
          postalCode: (order.shippingAddress as any).postalCode || '',
          country: (order.shippingAddress as any).country || 'India',
          isDefault: true
        }];
      }
    } else {
      const newCustomer: Customer = {
        id: `cust-${Date.now()}`,
        name: order.customerName,
        email: order.customerEmail,
        phone: order.customerPhone,
        numberForOrders: 1,
        totalPurchaseValue: order.totalAmount,
        lastOrderDate: new Date().toISOString(),
        accountStatus: 'Active',
        createdAt: new Date().toISOString(),
        addresses: order.shippingAddress ? [{
          street: (order.shippingAddress as any).street || order.address || '',
          city: (order.shippingAddress as any).city || order.city || '',
          state: (order.shippingAddress as any).state || '',
          postalCode: (order.shippingAddress as any).postalCode || '',
          country: (order.shippingAddress as any).country || 'India',
          isDefault: true
        }] : []
      };
      this.state.customers.push(newCustomer);
    }
  }

  public registerCustomer(customerData: { name: string; email: string; phone?: string; addresses?: any[] }): Customer {
    let customer: Customer;
    const existing = this.state.customers.find(c => c.email.toLowerCase() === customerData.email.toLowerCase());
    if (existing) {
      existing.name = customerData.name || existing.name;
      if (customerData.phone) existing.phone = customerData.phone;
      if (customerData.addresses && customerData.addresses.length > 0) {
        existing.addresses = customerData.addresses;
      }
      customer = existing;
    } else {
      customer = {
        id: `cust-${Date.now()}`,
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone || '',
        numberForOrders: 0,
        totalPurchaseValue: 0,
        accountStatus: 'Active',
        createdAt: new Date().toISOString(),
        addresses: customerData.addresses || []
      };
      this.state.customers.unshift(customer);
    }
    this.saveToDisk();
    eventStream.broadcast('CUSTOMER_REGISTERED', customer);
    eventStream.broadcast('CUSTOMERS_UPDATED', { customers: this.state.customers });
    return customer;
  }

  public updateCustomer(id: string, updates: Partial<Customer>): Customer | undefined {
    const customer = this.state.customers.find(c => c.id === id);
    if (!customer) return undefined;

    Object.assign(customer, updates);
    this.saveToDisk();
    eventStream.broadcast('CUSTOMER_UPDATED', customer);
    eventStream.broadcast('CUSTOMERS_UPDATED', { customers: this.state.customers });
    return customer;
  }

  public getCustomers(): Customer[] {
    return this.state.customers;
  }

  // ================= CMS & SETTINGS =================

  public getOffers(): Offer[] {
    return this.state.offers;
  }

  public saveOffer(offer: Offer): Offer {
    const idx = this.state.offers.findIndex(o => o.id === offer.id);
    if (idx >= 0) {
      this.state.offers[idx] = offer;
    } else {
      this.state.offers.push(offer);
    }
    this.saveToDisk();
    eventStream.broadcast('OFFER_MUTATED', offer);
    return offer;
  }

  public deleteOffer(id: string): boolean {
    const before = this.state.offers.length;
    this.state.offers = this.state.offers.filter(o => o.id !== id);
    const changed = this.state.offers.length < before;
    if (changed) {
      this.saveToDisk();
      eventStream.broadcast('OFFER_MUTATED', { id, deleted: true });
    }
    return changed;
  }

  public getFAQs(): FAQ[] {
    return this.state.faqs;
  }

  public saveFAQ(faq: FAQ): FAQ {
    const idx = this.state.faqs.findIndex(f => f.id === faq.id);
    if (idx >= 0) {
      this.state.faqs[idx] = faq;
    } else {
      this.state.faqs.push(faq);
    }
    this.saveToDisk();
    return faq;
  }

  public deleteFAQ(id: string): boolean {
    const before = this.state.faqs.length;
    this.state.faqs = this.state.faqs.filter(f => f.id !== id);
    const changed = this.state.faqs.length < before;
    if (changed) {
      this.saveToDisk();
    }
    return changed;
  }

  public getVideos(): Video[] {
    return this.state.videos;
  }

  public saveVideo(video: Video): Video {
    const idx = this.state.videos.findIndex(v => v.id === video.id);
    if (idx >= 0) {
      this.state.videos[idx] = video;
    } else {
      this.state.videos.push(video);
    }
    this.saveToDisk();
    return video;
  }

  public deleteVideo(id: string): boolean {
    const before = this.state.videos.length;
    this.state.videos = this.state.videos.filter(v => v.id !== id);
    const changed = this.state.videos.length < before;
    if (changed) {
      this.saveToDisk();
    }
    return changed;
  }

  public getHomepage(): HomepageConfig {
    return this.state.homepage;
  }

  public saveHomepage(config: HomepageConfig): HomepageConfig {
    this.state.homepage = config;
    this.saveToDisk();
    eventStream.broadcast('SETTINGS_MUTATED', { type: 'homepage', config });
    return config;
  }

  public getSettings(): SystemSettings {
    return this.state.settings;
  }

  public saveSettings(settings: SystemSettings): SystemSettings {
    this.state.settings = settings;
    this.saveToDisk();
    eventStream.broadcast('SETTINGS_MUTATED', { type: 'settings', settings });
    return settings;
  }

  public getSEO(): SEOConfig[] {
    return this.state.seo;
  }

  public saveSEO(seo: SEOConfig): SEOConfig {
    const idx = this.state.seo.findIndex(s => s.page === seo.page);
    if (idx >= 0) {
      this.state.seo[idx] = seo;
    } else {
      this.state.seo.push(seo);
    }
    this.saveToDisk();
    return seo;
  }
}

export const dbService = new DatabaseService();
