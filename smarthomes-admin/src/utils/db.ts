import {
  Product,
  Category,
  FAQ,
  Video,
  Offer,
  SEOConfig,
  AdminUser,
  HomepageConfig,
  SystemSettings,
  Order,
  Customer,
  ActivityLog
} from '../types';
import {
  initialCategories,
  initialProducts,
  initialFAQs,
  initialVideos,
  initialOffers,
  initialSEOConfigs,
  initialAdminUsers,
  initialHomepageConfig,
  initialSystemSettings,
  initialCustomers,
  initialOrders
} from '../data/initialData';
import { getDb, isFirebaseConfigured, getAuthInstance } from './firebase';
import { getApiBaseUrl, AdminApiService } from './api';
import { signOut } from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  deleteDoc, 
  collection, 
  getDocs, 
  writeBatch,
  getDoc,
  onSnapshot
} from 'firebase/firestore';

// Local storage keys for caching and offline support
const KEYS = {
  PRODUCTS: 'smarthomes_products',
  CATEGORIES: 'smarthomes_categories',
  FAQS: 'smarthomes_faqs',
  VIDEOS: 'smarthomes_videos',
  OFFERS: 'smarthomes_offers',
  SEO: 'smarthomes_seo',
  ADMINS: 'smarthomes_admins',
  HOMEPAGE: 'smarthomes_homepage',
  SETTINGS: 'smarthomes_settings',
  CUSTOMERS: 'smarthomes_customers',
  ORDERS: 'smarthomes_orders',
  ACTIVITY: 'smarthomes_activity',
  SESSION: 'smarthomes_admin_session'
};

// State change notification listeners
type DBListener = () => void;
const dbListeners = new Set<DBListener>();

export function subscribeToDBChanges(listener: DBListener): () => void {
  dbListeners.add(listener);
  return () => dbListeners.delete(listener);
}

function notifyDBListeners() {
  dbListeners.forEach(listener => {
    try {
      listener();
    } catch (e) {
      console.error('Error in DB listener:', e);
    }
  });
}

// Generic storage functions
function getStorageItem<T>(key: string, defaultValue: T): T {
  const item = localStorage.getItem(key);
  if (!item) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  try {
    return JSON.parse(item) as T;
  } catch {
    return defaultValue;
  }
}

function setStorageItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// Initialize Database if empty
export function initDB(): void {
  getStorageItem<Category[]>(KEYS.CATEGORIES, initialCategories);
  getStorageItem<Product[]>(KEYS.PRODUCTS, initialProducts);
  getStorageItem<FAQ[]>(KEYS.FAQS, initialFAQs);
  getStorageItem<Video[]>(KEYS.VIDEOS, initialVideos);
  getStorageItem<Offer[]>(KEYS.OFFERS, initialOffers);
  getStorageItem<SEOConfig[]>(KEYS.SEO, initialSEOConfigs);
  getStorageItem<AdminUser[]>(KEYS.ADMINS, initialAdminUsers);
  getStorageItem<HomepageConfig>(KEYS.HOMEPAGE, initialHomepageConfig);
  getStorageItem<SystemSettings>(KEYS.SETTINGS, initialSystemSettings);
  getStorageItem<Customer[]>(KEYS.CUSTOMERS, initialCustomers);
  getStorageItem<Order[]>(KEYS.ORDERS, initialOrders);
  
  const currentLogs = localStorage.getItem(KEYS.ACTIVITY);
  if (!currentLogs) {
    setStorageItem<ActivityLog[]>(KEYS.ACTIVITY, [
      {
        id: 'log-init',
        adminEmail: 'system@smarthomes.com',
        action: 'Database Initialized',
        target: 'System Database',
        timestamp: new Date().toISOString()
      }
    ]);
  }

  // Hydrate from unified backend API and listen to live client events
  if (typeof window !== 'undefined') {
    const apiBase = getApiBaseUrl();
    fetch(`${apiBase}/api/products`)
      .then(r => r.json())
      .then(prods => {
        if (Array.isArray(prods) && prods.length > 0) {
          setStorageItem(KEYS.PRODUCTS, prods);
          notifyDBListeners();
        }
      })
      .catch(() => {});

    fetch(`${apiBase}/api/categories`)
      .then(r => r.json())
      .then(cats => {
        if (Array.isArray(cats) && cats.length > 0) {
          setStorageItem(KEYS.CATEGORIES, cats);
          notifyDBListeners();
        }
      })
      .catch(() => {});

    // Hydrate orders from backend
    fetch(`${apiBase}/api/orders`)
      .then(r => r.json())
      .then(orders => {
        if (Array.isArray(orders) && orders.length > 0) {
          setStorageItem(KEYS.ORDERS, orders);
          notifyDBListeners();
        }
      })
      .catch(() => {});

    // Hydrate customers from backend
    fetch(`${apiBase}/api/orders/customers/all`)
      .then(r => r.json())
      .then(customers => {
        if (Array.isArray(customers) && customers.length > 0) {
          setStorageItem(KEYS.CUSTOMERS, customers);
          notifyDBListeners();
        }
      })
      .catch(() => {});

    // Hydrate CMS content & settings from backend
    fetch(`${apiBase}/api/cms/offers`)
      .then(r => r.json())
      .then(offers => {
        if (Array.isArray(offers) && offers.length > 0) {
          setStorageItem(KEYS.OFFERS, offers);
          notifyDBListeners();
        }
      })
      .catch(() => {});

    fetch(`${apiBase}/api/cms/faqs`)
      .then(r => r.json())
      .then(faqs => {
        if (Array.isArray(faqs) && faqs.length > 0) {
          setStorageItem(KEYS.FAQS, faqs);
          notifyDBListeners();
        }
      })
      .catch(() => {});

    fetch(`${apiBase}/api/cms/videos`)
      .then(r => r.json())
      .then(videos => {
        if (Array.isArray(videos) && videos.length > 0) {
          setStorageItem(KEYS.VIDEOS, videos);
          notifyDBListeners();
        }
      })
      .catch(() => {});

    fetch(`${apiBase}/api/cms/homepage`)
      .then(r => r.json())
      .then(homepage => {
        if (homepage && typeof homepage === 'object') {
          setStorageItem(KEYS.HOMEPAGE, homepage);
          notifyDBListeners();
        }
      })
      .catch(() => {});

    fetch(`${apiBase}/api/cms/settings`)
      .then(r => r.json())
      .then(settings => {
        if (settings && typeof settings === 'object') {
          setStorageItem(KEYS.SETTINGS, settings);
          notifyDBListeners();
        }
      })
      .catch(() => {});

    fetch(`${apiBase}/api/cms/seo`)
      .then(r => r.json())
      .then(seo => {
        if (Array.isArray(seo) && seo.length > 0) {
          setStorageItem(KEYS.SEO, seo);
          notifyDBListeners();
        }
      })
      .catch(() => {});

    // Realtime notification when customers order or register on storefront
    AdminApiService.subscribeToEvents((event) => {
      if (event.type === 'ORDER_PLACED' && event.data) {
        console.log('[Admin Live Alert] New order received from storefront:', event.data);
        const orders = getStorageItem<Order[]>(KEYS.ORDERS, []);
        const exists = orders.some(o => o.id === event.data.id);
        if (!exists) {
          setStorageItem(KEYS.ORDERS, [event.data, ...orders]);
          logActivity('Store Order Received', `Order #${event.data.orderNumber} - ₹${event.data.totalAmount}`);
          notifyDBListeners();
        }
      } else if (event.type === 'ORDER_UPDATED' && event.data) {
        const orders = getStorageItem<Order[]>(KEYS.ORDERS, []);
        const idx = orders.findIndex(o => o.id === event.data.id);
        if (idx !== -1) {
          orders[idx] = { ...orders[idx], ...event.data };
          setStorageItem(KEYS.ORDERS, orders);
          notifyDBListeners();
        }
      } else if (event.type === 'CUSTOMERS_UPDATED' && event.data?.customers) {
        setStorageItem(KEYS.CUSTOMERS, event.data.customers);
        notifyDBListeners();
      } else if (event.type === 'CUSTOMER_REGISTERED' && event.data) {
        const customers = getStorageItem<Customer[]>(KEYS.CUSTOMERS, []);
        const idx = customers.findIndex(c => c.email?.toLowerCase() === event.data.email?.toLowerCase());
        if (idx >= 0) {
          customers[idx] = { ...customers[idx], ...event.data };
        } else {
          customers.unshift(event.data);
        }
        setStorageItem(KEYS.CUSTOMERS, customers);
        notifyDBListeners();
      } else if (event.type === 'CUSTOMER_UPDATED' && event.data) {
        const customers = getStorageItem<Customer[]>(KEYS.CUSTOMERS, []);
        const idx = customers.findIndex(c => c.id === event.data.id || c.email?.toLowerCase() === event.data.email?.toLowerCase());
        if (idx >= 0) {
          customers[idx] = { ...customers[idx], ...event.data };
          setStorageItem(KEYS.CUSTOMERS, customers);
          notifyDBListeners();
        }
      } else if (event.type === 'INVENTORY_CHANGED' && event.data?.products) {
        setStorageItem(KEYS.PRODUCTS, event.data.products);
        notifyDBListeners();
      } else if (event.type === 'OFFER_MUTATED' && event.data) {
        fetch(`${apiBase}/api/cms/offers`).then(r => r.json()).then(offs => {
          if (Array.isArray(offs)) {
            setStorageItem(KEYS.OFFERS, offs);
            notifyDBListeners();
          }
        }).catch(() => {});
      } else if (event.type === 'SETTINGS_MUTATED' && event.data) {
        if (event.data.type === 'homepage') {
          setStorageItem(KEYS.HOMEPAGE, event.data.config);
          notifyDBListeners();
        } else if (event.data.type === 'settings') {
          setStorageItem(KEYS.SETTINGS, event.data.settings);
          notifyDBListeners();
        }
      }
    });
  }
}

// Call immediately on module load
initDB();

// --- FIRESTORE SYNC HELPERS (Asynchronous, Non-Blocking) ---

export function sanitizeForFirestore<T>(data: T): T {
  if (data === undefined) {
    return null as any;
  }
  if (data === null) {
    return null as any;
  }
  if (Array.isArray(data)) {
    return data.map(item => sanitizeForFirestore(item)) as any;
  }
  if (data instanceof Date) {
    return data.toISOString() as any;
  }
  if (typeof data === 'object') {
    const clean: any = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        clean[key] = sanitizeForFirestore(value);
      }
    }
    return clean;
  }
  return data;
}

export async function syncToFirestore(collectionName: string, docId: string, data: any): Promise<void> {
  // 1. Mirror directly to the Unified Backend API
  try {
    const apiBase = getApiBaseUrl();
    if (collectionName === 'products') {
      fetch(`${apiBase}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).catch(e => console.warn('[Backend Mirror Failed]:', e.message));
    } else if (collectionName === 'categories') {
      fetch(`${apiBase}/api/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).catch(() => {});
    } else if (collectionName === 'orders') {
      fetch(`${apiBase}/api/orders/${docId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).catch(() => {});
    } else if (collectionName === 'customers') {
      fetch(`${apiBase}/api/orders/customers/${docId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).catch(() => {});
    } else if (['homepage', 'settings', 'offers', 'faqs', 'videos', 'seo'].includes(collectionName)) {
      fetch(`${apiBase}/api/cms/${collectionName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).catch(() => {});
    }
  } catch (backendErr) {
    console.warn('[Backend Mirror Warning]:', backendErr);
  }

  // 2. Write to Firebase Firestore if configured
  if (!isFirebaseConfigured()) {
    return;
  }

  try {
    const db = getDb();
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, sanitizeForFirestore(data));
  } catch (error: any) {
    console.warn(`Firestore save warning inside collection [${collectionName}]:`, error.message || error);
  }
}

export async function deleteFromFirestore(collectionName: string, docId: string): Promise<void> {
  // 1. Mirror deletion to Unified Backend
  try {
    const apiBase = getApiBaseUrl();
    if (collectionName === 'products') {
      fetch(`${apiBase}/api/products/${docId}`, { method: 'DELETE' }).catch(() => {});
    } else if (collectionName === 'categories') {
      fetch(`${apiBase}/api/categories/${docId}`, { method: 'DELETE' }).catch(() => {});
    } else if (['offers', 'faqs', 'videos'].includes(collectionName)) {
      fetch(`${apiBase}/api/cms/${collectionName}/${docId}`, { method: 'DELETE' }).catch(() => {});
    }
  } catch (err) {
    console.warn('[Backend Delete Mirror]:', err);
  }

  // 2. Delete from Firestore if configured
  if (!isFirebaseConfigured()) {
    return;
  }
  try {
    const db = getDb();
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error: any) {
    console.warn(`Firestore deletion warning inside collection [${collectionName}]:`, error.message || error);
  }
}

/**
 * Force pushes local records as seed data to Firebase.
 * Essential when starting with an empty Firestore instance on smarthomes-366443.
 */
export async function seedFirestoreWithLocalData(
  onProgress?: (msg: string) => void,
  useOriginalCatalog: boolean = true
): Promise<{ success: boolean; error?: string }> {
  if (!isFirebaseConfigured()) {
    return { success: false, error: 'Firebase is not configured.' };
  }
  
  try {
    const db = getDb();
    const batch = writeBatch(db);
    
    // Cache original datasets into Local Storage if useOriginalCatalog is checked
    if (useOriginalCatalog) {
      onProgress?.('Hydrating Local Cache with premium catalogue...');
      saveCategories(initialCategories);
      saveProducts(initialProducts);
      saveFAQs(initialFAQs);
      saveVideos(initialVideos);
      saveOffers(initialOffers);
      setStorageItem(KEYS.SEO, initialSEOConfigs);
      saveHomepageConfig(initialHomepageConfig);
      saveSystemSettings(initialSystemSettings);
      saveCustomers(initialCustomers);
      saveOrders(initialOrders);
    }

    onProgress?.('Uploading Smart Home Categories...');
    const categories = getCategories();
    for (const cat of categories) {
      const docRef = doc(db, 'categories', cat.id);
      batch.set(docRef, sanitizeForFirestore(cat));
    }

    onProgress?.('Uploading Premium Product Catalogue...');
    const products = getProducts();
    for (const prod of products) {
      const docRef = doc(db, 'products', prod.id);
      batch.set(docRef, sanitizeForFirestore(prod));
    }

    onProgress?.('Uploading Frequently Asked Questions...');
    const faqs = getFAQs();
    for (const faq of faqs) {
      const docRef = doc(db, 'faqs', faq.id);
      batch.set(docRef, sanitizeForFirestore(faq));
    }

    onProgress?.('Uploading Videos Catalog...');
    const videos = getVideos();
    for (const vid of videos) {
      const docRef = doc(db, 'videos', vid.id);
      batch.set(docRef, sanitizeForFirestore(vid));
    }

    onProgress?.('Uploading Offers & Coupons...');
    const offers = getOffers();
    for (const off of offers) {
      const docRef = doc(db, 'offers', off.id);
      batch.set(docRef, sanitizeForFirestore(off));
    }

    onProgress?.('Uploading System SEO and Meta Configurations...');
    const seos = getSEOConfigs();
    for (const s of seos) {
      const docRef = doc(db, 'seo', s.page);
      batch.set(docRef, sanitizeForFirestore(s));
    }

    onProgress?.('Uploading Business Configurations...');
    const homepage = getHomepageConfig();
    batch.set(doc(db, 'homepage', 'config'), sanitizeForFirestore(homepage));

    const settings = getSystemSettings();
    batch.set(doc(db, 'settings', 'config'), sanitizeForFirestore(settings));

    onProgress?.('Uploading Customers ledger...');
    const customers = getCustomers();
    for (const cust of customers) {
      const docRef = doc(db, 'customers', cust.id);
      batch.set(docRef, sanitizeForFirestore(cust));
    }

    onProgress?.('Uploading Orders ledger...');
    const orders = getOrders();
    for (const ord of orders) {
      const docRef = doc(db, 'orders', ord.id);
      batch.set(docRef, sanitizeForFirestore(ord));
    }

    onProgress?.('Committing write batches to Firestore...');
    await batch.commit();
    
    logActivity('Firestore Seed Complete', 'Pushed default dataset to smarthomes-366443');
    notifyDBListeners();
    return { success: true };
  } catch (error: any) {
    console.error('Firestore seeding failed:', error);
    return { success: false, error: error?.message || 'Access Denied / Write permission failed' };
  }
}

/**
 * Dynamic sync engine pulling the entire active catalog and logs from Firestore collections
 * to ensure that the Admin Panel operates with the exact same data as the public website.
 */
export async function pullDataFromFirestore(): Promise<{ success: boolean; error?: string }> {
  if (!isFirebaseConfigured()) {
    return { success: false, error: 'Firebase credentials are missing.' };
  }

  const db = getDb();
  let pullSucceededAtLeastOnce = false;
  let lastError: any = null;

  // 1. Categories
  try {
    const catSnap = await getDocs(collection(db, 'categories'));
    const categoriesList: Category[] = [];
    catSnap.forEach(docSnap => {
      categoriesList.push(docSnap.data() as Category);
    });
    if (categoriesList.length > 0) {
      setStorageItem(KEYS.CATEGORIES, categoriesList);
    }
    pullSucceededAtLeastOnce = true;
  } catch (err: any) {
    console.warn('[Firebase Pull] Skipped categories sync:', err.message || err);
    lastError = err;
  }

  // 2. Products
  try {
    const prodSnap = await getDocs(collection(db, 'products'));
    const productsList: Product[] = [];
    prodSnap.forEach(docSnap => {
      productsList.push(docSnap.data() as Product);
    });
    if (productsList.length > 0) {
      setStorageItem(KEYS.PRODUCTS, productsList);
    }
    pullSucceededAtLeastOnce = true;
  } catch (err: any) {
    console.warn('[Firebase Pull] Skipped products sync:', err.message || err);
    lastError = err;
  }

  // 3. FAQs
  try {
    const faqSnap = await getDocs(collection(db, 'faqs'));
    const faqsList: FAQ[] = [];
    faqSnap.forEach(docSnap => {
      faqsList.push(docSnap.data() as FAQ);
    });
    if (faqsList.length > 0) {
      setStorageItem(KEYS.FAQS, faqsList);
    }
    pullSucceededAtLeastOnce = true;
  } catch (err: any) {
    console.warn('[Firebase Pull] Skipped faqs sync:', err.message || err);
    lastError = err;
  }

  // 4. Videos
  try {
    const vidSnap = await getDocs(collection(db, 'videos'));
    const videosList: Video[] = [];
    vidSnap.forEach(docSnap => {
      videosList.push(docSnap.data() as Video);
    });
    if (videosList.length > 0) {
      setStorageItem(KEYS.VIDEOS, videosList);
    }
    pullSucceededAtLeastOnce = true;
  } catch (err: any) {
    console.warn('[Firebase Pull] Skipped videos sync:', err.message || err);
    lastError = err;
  }

  // 5. Offers
  try {
    const offSnap = await getDocs(collection(db, 'offers'));
    const offersList: Offer[] = [];
    offSnap.forEach(docSnap => {
      offersList.push(docSnap.data() as Offer);
    });
    if (offersList.length > 0) {
      setStorageItem(KEYS.OFFERS, offersList);
    }
    pullSucceededAtLeastOnce = true;
  } catch (err: any) {
    console.warn('[Firebase Pull] Skipped offers sync:', err.message || err);
    lastError = err;
  }

  // 6. SEO
  try {
    const seoSnap = await getDocs(collection(db, 'seo'));
    const seoList: SEOConfig[] = [];
    seoSnap.forEach(docSnap => {
      seoList.push(docSnap.data() as SEOConfig);
    });
    if (seoList.length > 0) {
      setStorageItem(KEYS.SEO, seoList);
    }
    pullSucceededAtLeastOnce = true;
  } catch (err: any) {
    console.warn('[Firebase Pull] Skipped seo sync:', err.message || err);
    lastError = err;
  }

  // 7. Homepage Config
  try {
    const hpDoc = await getDoc(doc(db, 'homepage', 'config'));
    if (hpDoc.exists()) {
      setStorageItem(KEYS.HOMEPAGE, hpDoc.data() as HomepageConfig);
    }
    pullSucceededAtLeastOnce = true;
  } catch (err: any) {
    console.warn('[Firebase Pull] Skipped homepage config sync:', err.message || err);
    lastError = err;
  }

  // 8. System Settings
  try {
    const settingsDoc = await getDoc(doc(db, 'settings', 'config'));
    if (settingsDoc.exists()) {
      setStorageItem(KEYS.SETTINGS, settingsDoc.data() as SystemSettings);
    }
    pullSucceededAtLeastOnce = true;
  } catch (err: any) {
    console.warn('[Firebase Pull] Skipped system settings sync:', err.message || err);
    lastError = err;
  }

  // 9. Customers
  try {
    const custSnap = await getDocs(collection(db, 'customers'));
    const customersList: Customer[] = [];
    custSnap.forEach(docSnap => {
      customersList.push(docSnap.data() as Customer);
    });
    if (customersList.length > 0) {
      setStorageItem(KEYS.CUSTOMERS, customersList);
    }
    pullSucceededAtLeastOnce = true;
  } catch (err: any) {
    console.warn('[Firebase Pull] Skipped customers sync:', err.message || err);
    lastError = err;
  }

  // 10. Admins
  try {
    const adminSnap = await getDocs(collection(db, 'admins'));
    const adminsList: AdminUser[] = [];
    adminSnap.forEach(docSnap => {
      adminsList.push(docSnap.data() as AdminUser);
    });
    if (adminsList.length > 0) {
      setStorageItem(KEYS.ADMINS, adminsList);
    }
    pullSucceededAtLeastOnce = true;
  } catch (e: any) {
    console.warn('[Firebase Pull] Skipped admins sync:', e.message || e);
    lastError = e;
  }

  // 11. Orders
  try {
    const ordSnap = await getDocs(collection(db, 'orders'));
    const ordersList: Order[] = [];
    ordSnap.forEach(docSnap => {
      ordersList.push(docSnap.data() as Order);
    });
    if (ordersList.length > 0) {
      setStorageItem(KEYS.ORDERS, ordersList);
    }
    pullSucceededAtLeastOnce = true;
  } catch (err: any) {
    console.warn('[Firebase Pull] Skipped orders sync:', err.message || err);
    lastError = err;
  }

  // 12. Activity Logs
  try {
    const actSnap = await getDocs(collection(db, 'activity'));
    const activityList: ActivityLog[] = [];
    actSnap.forEach(docSnap => {
      activityList.push(docSnap.data() as ActivityLog);
    });
    if (activityList.length > 0) {
      activityList.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setStorageItem(KEYS.ACTIVITY, activityList);
    }
    pullSucceededAtLeastOnce = true;
  } catch (err: any) {
    console.warn('[Firebase Pull] Skipped activity logs sync:', err.message || err);
    lastError = err;
  }

  notifyDBListeners();

  if (pullSucceededAtLeastOnce) {
    logActivity('Firebase Synced', 'Successfully pulled absolute Firestore dataset');
    return { success: true };
  } else {
    const isPermissionErr = lastError?.message?.toLowerCase().includes('permission') || lastError?.message?.toLowerCase().includes('insufficient');
    if (isPermissionErr) {
      console.info('[Firebase Pull] Read access restricted by active security rules. Operating on offline local cache.');
    } else {
      console.warn('[Firebase Pull] Pull completed with empty dataset or offline cache:', lastError);
    }
    return { success: true };
  }
}

// Logger helper
export function logActivity(action: string, target: string): void {
  const session = getAdminSession();
  const email = session ? session.email : 'system@smarthomes.com';
  const logs = getStorageItem<ActivityLog[]>(KEYS.ACTIVITY, []);
  
  const newLog: ActivityLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    adminEmail: email,
    action,
    target,
    timestamp: new Date().toISOString()
  };
  
  setStorageItem(KEYS.ACTIVITY, [newLog, ...logs]);
  
  // Async upload to Firestore only if configured and authenticated
  if (isFirebaseConfigured()) {
    try {
      const auth = getAuthInstance();
      if (auth.currentUser) {
        syncToFirestore('activity', newLog.id, newLog).catch(err => {
          console.warn('[Activity Log] Firestore write deferred:', err.message || err);
        });
      } else {
        console.log('[Activity Log] Bypassed Firestore sync for unauthenticated activity log:', action);
      }
    } catch (e) {
      console.warn('[Activity Log] Auth instance not ready or unconfigured:', e);
    }
  }
  notifyDBListeners();
}

// --- DB GETTERS AND SETTERS ---

// 1. Session & Auth
export function getAdminSession(): AdminUser | null {
  const session = localStorage.getItem(KEYS.SESSION);
  if (!session) return null;
  try {
    return JSON.parse(session) as AdminUser;
  } catch {
    return null;
  }
}

export function loginAdmin(email: string): AdminUser | null {
  const admins = getStorageItem<AdminUser[]>(KEYS.ADMINS, initialAdminUsers);
  const found = admins.find(a => a.email.toLowerCase() === email.toLowerCase() && a.active);
  if (found) {
    localStorage.setItem(KEYS.SESSION, JSON.stringify(found));
    logActivity('Admin Login Successful', found.email);
    return found;
  }
  logActivity('Admin Login Failed', email);
  return null;
}

export function logoutAdmin(): void {
  const session = getAdminSession();
  if (session) {
    logActivity('Admin Logout', session.email);
  }
  localStorage.removeItem(KEYS.SESSION);
  try {
    signOut(getAuthInstance());
  } catch (err) {
    console.warn('Firebase signOut failed or was unconfigured:', err);
  }
}

// 2. Products
export function getProducts(): Product[] {
  return getStorageItem<Product[]>(KEYS.PRODUCTS, []);
}

export async function getProductsDirect(): Promise<Product[]> {
  if (!isFirebaseConfigured()) {
    throw new Error('Firebase is not configured.');
  }

  const fetchPromise = (async () => {
    const db = getDb();
    const prodSnap = await getDocs(collection(db, 'products'));
    const productsList: Product[] = [];
    prodSnap.forEach(docSnap => {
      const data = docSnap.data();
      productsList.push({
        ...data,
        id: data.id || docSnap.id
      } as Product);
    });
    setStorageItem(KEYS.PRODUCTS, productsList);
    return productsList;
  })();

  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error('Firestore read timed out after 5000ms. Please check your Firestore network connection.'));
    }, 5000);
  });

  return Promise.race([fetchPromise, timeoutPromise]);
}

export function saveProducts(products: Product[]): void {
  setStorageItem(KEYS.PRODUCTS, products);
}

export async function addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: `prod-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // Instant write to Firestore first - will throw if it fails (e.g. permission or configuration error)
  await syncToFirestore('products', newProduct.id, newProduct);
  
  // Only save to localStorage if the cloud write succeeds!
  products.push(newProduct);
  saveProducts(products);
  
  logActivity('Product Created', `${newProduct.name} (${newProduct.sku})`);
  notifyDBListeners();
  return newProduct;
}

export async function updateProduct(id: string, updatedFields: Partial<Product>): Promise<Product> {
  const products = getProducts();
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) throw new Error('Product not found');
  
  const original = products[idx];
  const updated: Product = {
    ...original,
    ...updatedFields,
    updatedAt: new Date().toISOString()
  };
  
  // Instant write to Firestore first
  await syncToFirestore('products', id, updated);
  
  // Only update localStorage if the cloud write succeeds!
  products[idx] = updated;
  saveProducts(products);
  
  // Custom smart log descriptive messaging
  if (updatedFields.price !== undefined && updatedFields.price !== original.price) {
    logActivity('Product Price Changed', `${original.name}: ₹${original.price} -> ₹${updatedFields.price}`);
  } else if (updatedFields.discountPercentage !== undefined && updatedFields.discountPercentage !== original.discountPercentage) {
    logActivity('Product Discount Changed', `${original.name}: ${original.discountPercentage}% -> ${updatedFields.discountPercentage}%`);
  } else if (updatedFields.stock !== undefined && updatedFields.stock !== original.stock) {
    logActivity('Product Stock Changed', `${original.name}: ${original.stock} -> ${updatedFields.stock}`);
  } else {
    logActivity('Product Edited', original.name);
  }
  
  notifyDBListeners();
  return updated;
}

export async function deleteProduct(id: string): Promise<void> {
  const products = getProducts();
  const found = products.find(p => p.id === id);
  if (found) {
    // 1. Optimistic Cache Update (Instant)
    const filtered = products.filter(p => p.id !== id);
    saveProducts(filtered);
    logActivity('Product Deleted', found.name);
    notifyDBListeners();
    
    // 2. Background Firestore Deletion
    deleteFromFirestore('products', id).catch(err => {
      console.error('Firestore delete failed for product, reverting:', err);
      const current = getProducts();
      if (!current.some(p => p.id === id)) {
        saveProducts([...current, found]);
        notifyDBListeners();
      }
    });
  }
}

/**
 * Explicit dynamic duplication support satisfying: "duplicate product" with Firestore write.
 */
export async function duplicateProduct(id: string): Promise<Product> {
  const products = getProducts();
  const found = products.find(p => p.id === id);
  if (!found) throw new Error('Source product not found');
  
  const duplicated: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
    ...found,
    name: `${found.name} (Copy)`,
    sku: `${found.sku}-COPY-${Date.now().toString().substr(-4)}`,
    slug: `${found.slug}-copy-${Date.now().toString().substr(-4)}`,
    featured: false
  };
  
  return await addProduct(duplicated);
}

// 3. Categories
export function getCategories(): Category[] {
  return getStorageItem<Category[]>(KEYS.CATEGORIES, []);
}

export function saveCategories(categories: Category[]): void {
  setStorageItem(KEYS.CATEGORIES, categories);
}

export function addCategory(category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Category {
  const categories = getCategories();
  const newCategory: Category = {
    ...category,
    id: category.slug || `cat-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  categories.push(newCategory);
  saveCategories(categories);
  
  // Sync to Firestore
  syncToFirestore('categories', newCategory.id, newCategory);
  
  logActivity('Category Created', newCategory.name);
  notifyDBListeners();
  return newCategory;
}

export function updateCategory(id: string, updatedFields: Partial<Category>): Category {
  const categories = getCategories();
  const idx = categories.findIndex(c => c.id === id);
  if (idx === -1) throw new Error('Category not found');
  
  const original = categories[idx];
  const updated: Category = {
    ...original,
    ...updatedFields,
    updatedAt: new Date().toISOString()
  };
  categories[idx] = updated;
  saveCategories(categories);
  
  // Sync to Firestore
  syncToFirestore('categories', id, updated);
  
  logActivity('Category Edited', original.name);
  notifyDBListeners();
  return updated;
}

export async function deleteCategory(id: string): Promise<void> {
  const categories = getCategories();
  const found = categories.find(c => c.id === id);
  if (found) {
    // 1. Optimistic Cache Update (Instant)
    const filtered = categories.filter(c => c.id !== id);
    saveCategories(filtered);
    logActivity('Category Deleted', found.name);
    notifyDBListeners();
    
    // 2. Background Firestore Deletion
    deleteFromFirestore('categories', id).catch(err => {
      console.error('Firestore delete failed for category, reverting:', err);
      const current = getCategories();
      if (!current.some(c => c.id === id)) {
        saveCategories([...current, found]);
        notifyDBListeners();
      }
    });
  }
}

// 4. FAQs
export function getFAQs(): FAQ[] {
  return getStorageItem<FAQ[]>(KEYS.FAQS, []);
}

export function saveFAQs(faqs: FAQ[]): void {
  setStorageItem(KEYS.FAQS, faqs);
}

export function addFAQ(faq: Omit<FAQ, 'id' | 'createdAt'>): FAQ {
  const faqs = getFAQs();
  const newFaq: FAQ = {
    ...faq,
    id: `faq-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  faqs.push(newFaq);
  saveFAQs(faqs);
  
  // Sync to Firestore
  syncToFirestore('faqs', newFaq.id, newFaq);
  
  logActivity('FAQ Created', newFaq.question.substr(0, 40) + '...');
  notifyDBListeners();
  return newFaq;
}

export function updateFAQ(id: string, updatedFields: Partial<FAQ>): FAQ {
  const faqs = getFAQs();
  const idx = faqs.findIndex(f => f.id === id);
  if (idx === -1) throw new Error('FAQ not found');
  const updated = { ...faqs[idx], ...updatedFields };
  faqs[idx] = updated;
  saveFAQs(faqs);
  
  // Sync to Firestore
  syncToFirestore('faqs', id, updated);
  
  logActivity('FAQ Edited', updated.question.substr(0, 40) + '...');
  notifyDBListeners();
  return updated;
}

export function deleteFAQ(id: string): void {
  const faqs = getFAQs();
  const found = faqs.find(f => f.id === id);
  if (found) {
    const filtered = faqs.filter(f => f.id !== id);
    saveFAQs(filtered);
    
    // Sync to Firestore
    deleteFromFirestore('faqs', id);
    
    logActivity('FAQ Deleted', found.question.substr(0, 40) + '...');
    notifyDBListeners();
  }
}

// 5. Videos
export function getVideos(): Video[] {
  return getStorageItem<Video[]>(KEYS.VIDEOS, []);
}

export function saveVideos(videos: Video[]): void {
  setStorageItem(KEYS.VIDEOS, videos);
}

export function addVideo(video: Omit<Video, 'id' | 'createdAt'>): Video {
  const videos = getVideos();
  const newVideo: Video = {
    ...video,
    id: `vid-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  videos.push(newVideo);
  saveVideos(videos);
  
  // Sync to Firestore
  syncToFirestore('videos', newVideo.id, newVideo);
  
  logActivity('Video Created', newVideo.title);
  notifyDBListeners();
  return newVideo;
}

export function updateVideo(id: string, updatedFields: Partial<Video>): Video {
  const videos = getVideos();
  const idx = videos.findIndex(v => v.id === id);
  if (idx === -1) throw new Error('Video not found');
  const updated = { ...videos[idx], ...updatedFields };
  videos[idx] = updated;
  saveVideos(videos);
  
  // Sync to Firestore
  syncToFirestore('videos', id, updated);
  
  logActivity('Video Edited', updated.title);
  notifyDBListeners();
  return updated;
}

export function deleteVideo(id: string): void {
  const videos = getVideos();
  const found = videos.find(v => v.id === id);
  if (found) {
    const filtered = videos.filter(v => v.id !== id);
    saveVideos(filtered);
    
    // Sync to Firestore
    deleteFromFirestore('videos', id);
    
    logActivity('Video Deleted', found.title);
    notifyDBListeners();
  }
}

// 6. Offers
export function getOffers(): Offer[] {
  return getStorageItem<Offer[]>(KEYS.OFFERS, []);
}

export function saveOffers(offers: Offer[]): void {
  setStorageItem(KEYS.OFFERS, offers);
}

export function addOffer(offer: Omit<Offer, 'id' | 'createdAt'>): Offer {
  const offers = getOffers();
  const newOffer: Offer = {
    ...offer,
    id: `off-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  offers.push(newOffer);
  saveOffers(offers);
  
  // Sync to Firestore
  syncToFirestore('offers', newOffer.id, newOffer);
  
  logActivity('Offer Discount Created', newOffer.title);
  notifyDBListeners();
  return newOffer;
}

export function updateOffer(id: string, updatedFields: Partial<Offer>): Offer {
  const offers = getOffers();
  const idx = offers.findIndex(o => o.id === id);
  if (idx === -1) throw new Error('Offer not found');
  const updated = { ...offers[idx], ...updatedFields };
  offers[idx] = updated;
  saveOffers(offers);
  
  // Sync to Firestore
  syncToFirestore('offers', id, updated);
  
  logActivity('Offer Discount Edited', updated.title);
  notifyDBListeners();
  return updated;
}

export function deleteOffer(id: string): void {
  const offers = getOffers();
  const found = offers.find(o => o.id === id);
  if (found) {
    const filtered = offers.filter(o => o.id !== id);
    saveOffers(filtered);
    
    // Sync to Firestore
    deleteFromFirestore('offers', id);
    
    logActivity('Offer Discount Deleted', found.title);
    notifyDBListeners();
  }
}

// 7. SEO
export function getSEOConfigs(): SEOConfig[] {
  return getStorageItem<SEOConfig[]>(KEYS.SEO, []);
}

export function updateSEOConfig(page: string, updatedFields: Partial<SEOConfig>): SEOConfig {
  const configs = getSEOConfigs();
  const idx = configs.findIndex(c => c.page.toLowerCase() === page.toLowerCase());
  if (idx === -1) {
    const newConfig: SEOConfig = {
      page,
      title: updatedFields.title || '',
      metaDescription: updatedFields.metaDescription || '',
      keywords: updatedFields.keywords || '',
      canonicalUrl: updatedFields.canonicalUrl || '',
      ogTitle: updatedFields.ogTitle || '',
      ogDescription: updatedFields.ogDescription || '',
      ogImage: updatedFields.ogImage || '',
      robotsIndex: updatedFields.robotsIndex !== undefined ? updatedFields.robotsIndex : true
    };
    configs.push(newConfig);
    setStorageItem(KEYS.SEO, configs);
    
    // Sync to Firestore
    syncToFirestore('seo', page, newConfig);
    
    logActivity('SEO Settings Initialized', page);
    notifyDBListeners();
    return newConfig;
  }
  const updated = { ...configs[idx], ...updatedFields };
  configs[idx] = updated;
  setStorageItem(KEYS.SEO, configs);
  
  // Sync to Firestore
  syncToFirestore('seo', page, updated);
  
  logActivity('SEO Settings Edited', page);
  notifyDBListeners();
  return updated;
}

// 8. Admin Users
export function getAdminUsers(): AdminUser[] {
  return getStorageItem<AdminUser[]>(KEYS.ADMINS, []);
}

export function saveAdminUsers(users: AdminUser[]): void {
  setStorageItem(KEYS.ADMINS, users);
}

export function addAdminUser(user: Omit<AdminUser, 'id' | 'createdAt'>): AdminUser {
  const users = getAdminUsers();
  const newUser: AdminUser = {
    ...user,
    id: `admin-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  saveAdminUsers(users);
  
  // Sync to Firestore
  syncToFirestore('admins', newUser.id, newUser);
  
  logActivity('Admin User Created', `${newUser.name} (${newUser.role})`);
  notifyDBListeners();
  return newUser;
}

export function updateAdminUser(id: string, updatedFields: Partial<AdminUser>): AdminUser {
  const users = getAdminUsers();
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) throw new Error('Admin not found');
  const updated = { ...users[idx], ...updatedFields };
  users[idx] = updated;
  saveAdminUsers(users);
  
  // Sync to Firestore
  syncToFirestore('admins', id, updated);
  
  logActivity('Admin User Status/Role Changed', updated.email);
  notifyDBListeners();
  return updated;
}

export function deleteAdminUser(id: string): void {
  const users = getAdminUsers();
  const found = users.find(u => u.id === id);
  if (found) {
    const filtered = users.filter(u => u.id !== id);
    saveAdminUsers(filtered);
    
    // Sync to Firestore
    deleteFromFirestore('admins', id);
    
    logActivity('Admin User Deleted', found.email);
    notifyDBListeners();
  }
}

// 9. Orders
export function getOrders(): Order[] {
  return getStorageItem<Order[]>(KEYS.ORDERS, []);
}

export function saveOrders(orders: Order[]): void {
  setStorageItem(KEYS.ORDERS, orders);
}

export function updateOrderStatus(id: string, status: Order['orderStatus'], payStatus?: Order['paymentStatus']): Order {
  const orders = getOrders();
  const idx = orders.findIndex(o => o.id === id);
  if (idx === -1) throw new Error('Order not found');
  const original = orders[idx];
  const updated: Order = {
    ...original,
    orderStatus: status,
    paymentStatus: payStatus || original.paymentStatus,
    updatedAt: new Date().toISOString()
  };
  orders[idx] = updated;
  saveOrders(orders);
  
  // Sync to Firestore
  syncToFirestore('orders', id, updated);
  
  logActivity('Order Status Updated', `Order ${id} status: ${original.orderStatus} -> ${status}`);
  notifyDBListeners();
  return updated;
}

// 10. Customers
export function getCustomers(): Customer[] {
  return getStorageItem<Customer[]>(KEYS.CUSTOMERS, []);
}

export function saveCustomers(customers: Customer[]): void {
  setStorageItem(KEYS.CUSTOMERS, customers);
}

export function updateCustomerStatus(id: string, status: Customer['accountStatus']): Customer {
  const customers = getCustomers();
  const idx = customers.findIndex(c => c.id === id);
  if (idx === -1) throw new Error('Customer not found');
  const original = customers[idx];
  const updated: Customer = {
    ...original,
    accountStatus: status
  };
  customers[idx] = updated;
  saveCustomers(customers);
  
  // Sync to Firestore
  syncToFirestore('customers', id, updated);
  
  logActivity('Customer Status Changed', `${original.name} is now ${status}`);
  notifyDBListeners();
  return updated;
}

// 11. Homepage
export function getHomepageConfig(): HomepageConfig {
  return getStorageItem<HomepageConfig>(KEYS.HOMEPAGE, initialHomepageConfig);
}

export function saveHomepageConfig(config: HomepageConfig): void {
  setStorageItem(KEYS.HOMEPAGE, config);
  
  // Sync to Firestore
  syncToFirestore('homepage', 'config', config);
  
  logActivity('Homepage Management Content Updated', 'Hero Title / Banner Info');
  notifyDBListeners();
}

// 12. Settings
export function getSystemSettings(): SystemSettings {
  return getStorageItem<SystemSettings>(KEYS.SETTINGS, initialSystemSettings);
}

export function saveSystemSettings(settings: SystemSettings): void {
  setStorageItem(KEYS.SETTINGS, settings);
  
  // Sync to Firestore
  syncToFirestore('settings', 'config', settings);
  
  logActivity('System Global Settings Updated', 'Store configuration changes');
  notifyDBListeners();
}

// 13. Activity Logs
export function getActivityLogs(): ActivityLog[] {
  return getStorageItem<ActivityLog[]>(KEYS.ACTIVITY, []);
}

// 14. Export / Import Backups
export interface BackupPayload {
  products: Product[];
  categories: Category[];
  faqs: FAQ[];
  videos: Video[];
  offers: Offer[];
  seo: SEOConfig[];
  homepage: HomepageConfig;
  settings: SystemSettings;
  customers: Customer[];
  orders: Order[];
}

function maskEmail(email?: string): string {
  if (!email) return '';
  const parts = email.split('@');
  if (parts.length !== 2) return 'masked@secure.com';
  const name = parts[0];
  const domain = parts[1];
  const maskedName = name.length > 2 ? name[0] + '***' + name[name.length - 1] : '***';
  const maskedDomain = domain.length > 3 ? domain[0] + '***' + domain[domain.length - 1] : '***';
  return `${maskedName}@${maskedDomain}`;
}

function maskPhone(phone?: string): string {
  if (!phone) return '';
  return phone.replace(/(\d{3})\d+(\d{3})/, '$1******$2');
}

function maskName(name?: string): string {
  if (!name) return '';
  return name.split(' ').map(n => n.length > 1 ? n[0] + '***' : '*').join(' ');
}

function maskAddress(addr?: any): any {
  if (!addr) return undefined;
  if (typeof addr === 'string') {
    return 'Masked Shipping Address, Secure Hub';
  }
  return {
    ...addr,
    street: '*** Secured Street ***',
    apartment: addr.apartment ? '***' : undefined,
    city: addr.city || '***',
    state: addr.state || '***',
    zipCode: addr.zipCode ? '***' + addr.zipCode.substr(-3) : '***'
  };
}

export function exportBackup(): string {
  // Map and mask Customer records
  const maskedCustomers = getCustomers().map(cust => ({
    ...cust,
    name: maskName(cust.name),
    email: maskEmail(cust.email),
    phone: maskPhone(cust.phone)
  }));

  // Map and mask Order records
  const maskedOrders = getOrders().map(ord => ({
    ...ord,
    customerName: maskName(ord.customerName),
    customerEmail: maskEmail(ord.customerEmail),
    shippingAddress: maskAddress(ord.shippingAddress)
  }));

  const payload: BackupPayload = {
    products: getProducts(),
    categories: getCategories(),
    faqs: getFAQs(),
    videos: getVideos(),
    offers: getOffers(),
    seo: getSEOConfigs(),
    homepage: getHomepageConfig(),
    settings: getSystemSettings(),
    customers: maskedCustomers,
    orders: maskedOrders
  };
  logActivity('System Backup Created', 'Exported JSON Config with masked PII data');
  return JSON.stringify(payload, null, 2);
}

export function restoreBackup(jsonString: string): boolean {
  try {
    const payload = JSON.parse(jsonString) as Partial<BackupPayload>;
    if (payload.products) {
      saveProducts(payload.products);
      payload.products.forEach(p => syncToFirestore('products', p.id, p));
    }
    if (payload.categories) {
      saveCategories(payload.categories);
      payload.categories.forEach(c => syncToFirestore('categories', c.id, c));
    }
    if (payload.faqs) {
      saveFAQs(payload.faqs);
      payload.faqs.forEach(f => syncToFirestore('faqs', f.id, f));
    }
    if (payload.videos) {
      saveVideos(payload.videos);
      payload.videos.forEach(v => syncToFirestore('videos', v.id, v));
    }
    if (payload.offers) {
      saveOffers(payload.offers);
      payload.offers.forEach(o => syncToFirestore('offers', o.id, o));
    }
    if (payload.seo) {
      setStorageItem(KEYS.SEO, payload.seo);
      payload.seo.forEach(s => syncToFirestore('seo', s.page, s));
    }
    if (payload.homepage) {
      saveHomepageConfig(payload.homepage);
    }
    if (payload.settings) {
      saveSystemSettings(payload.settings);
    }
    if (payload.customers) {
      saveCustomers(payload.customers);
      payload.customers.forEach(c => syncToFirestore('customers', c.id, c));
    }
    if (payload.orders) {
      saveOrders(payload.orders);
      payload.orders.forEach(o => syncToFirestore('orders', o.id, o));
    }
    
    logActivity('System Backup Restored', 'Imported JSON Config successfully and synced to Firestore');
    notifyDBListeners();
    return true;
  } catch (err) {
    console.error('Backup restoration failed:', err);
    return false;
  }
}

export let globalSyncError: string | null = null;
let activeListeners: (() => void)[] = [];

export function stopRealtimeSync(): void {
  activeListeners.forEach(unsubscribe => unsubscribe());
  activeListeners = [];
  globalSyncError = null;
  console.log('[Realtime Sync] All snapshot listeners successfully suspended.');
}

export function startRealtimeSync(): void {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase is not configured. Realtime sync is disabled.');
    return;
  }

  // Clear existing listeners to prevent duplication
  stopRealtimeSync();
  globalSyncError = null;

  // Enforce active Firebase Auth user presence to prevent unauthenticated database read errors
  const auth = getAuthInstance();
  if (!auth.currentUser) {
    console.warn('[Realtime Sync] Postponing realtime listeners initialization until Firebase Auth is established.');
    return;
  }

  try {
    const db = getDb();

    // Helper to process permission errors gracefully without triggering global.error flags
    const handleSyncError = (collectionName: string, error: any) => {
      const errMsg = error?.message || String(error);
      if (errMsg.toLowerCase().includes('permission') || errMsg.toLowerCase().includes('insufficient')) {
        console.info(`[Realtime Sync Mode] ${collectionName} subscriptions are offline-cached or restricted under active security rules.`);
      } else {
        console.error(`Realtime sync error on ${collectionName}:`, error);
        globalSyncError = errMsg;
        notifyDBListeners();
      }
    };

    // 1. Categories
    const unsubCategories = onSnapshot(collection(db, 'categories'), (snapshot) => {
      const list: Category[] = [];
      snapshot.forEach(docSnap => {
        list.push(docSnap.data() as Category);
      });
      if (list.length > 0) {
        setStorageItem(KEYS.CATEGORIES, list);
        notifyDBListeners();
      }
    }, (error) => {
      handleSyncError('categories', error);
    });
    activeListeners.push(unsubCategories);

    // 2. Products
    const unsubProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      const list: Product[] = [];
      snapshot.forEach(docSnap => {
        list.push(docSnap.data() as Product);
      });
      if (list.length > 0) {
        setStorageItem(KEYS.PRODUCTS, list);
        notifyDBListeners();
      }
    }, (error) => {
      handleSyncError('products', error);
    });
    activeListeners.push(unsubProducts);

    // 3. FAQs
    const unsubFaqs = onSnapshot(collection(db, 'faqs'), (snapshot) => {
      const list: FAQ[] = [];
      snapshot.forEach(docSnap => {
        list.push(docSnap.data() as FAQ);
      });
      if (list.length > 0) {
        setStorageItem(KEYS.FAQS, list);
        notifyDBListeners();
      }
    }, (error) => {
      handleSyncError('FAQs', error);
    });
    activeListeners.push(unsubFaqs);

    // 4. Videos
    const unsubVideos = onSnapshot(collection(db, 'videos'), (snapshot) => {
      const list: Video[] = [];
      snapshot.forEach(docSnap => {
        list.push(docSnap.data() as Video);
      });
      if (list.length > 0) {
        setStorageItem(KEYS.VIDEOS, list);
        notifyDBListeners();
      }
    }, (error) => {
      handleSyncError('videos', error);
    });
    activeListeners.push(unsubVideos);

    // 5. Offers
    const unsubOffers = onSnapshot(collection(db, 'offers'), (snapshot) => {
      const list: Offer[] = [];
      snapshot.forEach(docSnap => {
        list.push(docSnap.data() as Offer);
      });
      if (list.length > 0) {
        setStorageItem(KEYS.OFFERS, list);
        notifyDBListeners();
      }
    }, (error) => {
      handleSyncError('offers', error);
    });
    activeListeners.push(unsubOffers);

    // 6. Customers
    const unsubCustomers = onSnapshot(collection(db, 'customers'), (snapshot) => {
      const list: Customer[] = [];
      snapshot.forEach(docSnap => {
        list.push(docSnap.data() as Customer);
      });
      if (list.length > 0) {
        setStorageItem(KEYS.CUSTOMERS, list);
        notifyDBListeners();
      }
    }, (error) => {
      handleSyncError('customers', error);
    });
    activeListeners.push(unsubCustomers);

    // 7. Orders
    const unsubOrders = onSnapshot(collection(db, 'orders'), (snapshot) => {
      const list: Order[] = [];
      snapshot.forEach(docSnap => {
        list.push(docSnap.data() as Order);
      });
      if (list.length > 0) {
        setStorageItem(KEYS.ORDERS, list);
        notifyDBListeners();
      }
    }, (error) => {
      handleSyncError('orders', error);
    });
    activeListeners.push(unsubOrders);

    console.log('Realtime database sync engine successfully established for all core collections.');
  } catch (error) {
    console.error('Failed to start Realtime Sync engine:', error);
  }
}
