/**
 * ShopContext - Global E-Commerce State (Catalog, Cart, Wishlist, Compare, Enquiries, Navigation, Toasts)
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, Category, CartItem, OrderEnquiry, Offer, SiteContent } from '../types';
import { StorageService } from '../services/storage';
import { useAuth } from './AuthContext';
import { FirebaseService } from '../services/firebaseService';
import { db } from '../lib/firebase';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { ApiService } from '../services/api';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ShopContextType {
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  wishlistIds: string[];
  compareIds: string[];
  siteContent: SiteContent;
  offers: Offer[];
  searchQuery: string;
  activeRoute: string;
  routeParams: Record<string, string>;
  quickViewProduct: Product | null;
  enquiryModalProduct: Product | null;
  enquiryModalOpen: boolean;
  cartDrawerOpen: boolean;
  wishlistDrawerOpen: boolean;
  toasts: ToastMessage[];
  
  // Actions
  refreshData: () => void;
  setSearchQuery: (query: string) => void;
  navigateTo: (route: string, params?: Record<string, string>) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  toggleCompare: (product: Product) => void;
  isInCompare: (productId: string) => boolean;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  openEnquiryModal: (product?: Product) => void;
  closeEnquiryModal: () => void;
  toggleCartDrawer: (open?: boolean) => void;
  toggleWishlistDrawer: (open?: boolean) => void;
  submitEnquiry: (enquiryData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    type: OrderEnquiry['type'];
    items: { productId: string; productName: string; sku: string; quantity: number; price: number; image?: string }[];
    totalAmount: number;
    address?: string;
    city?: string;
    notes?: string;
    consultationType?: string;
    preferredDate?: string;
    preferredTime?: string;
    propertyType?: string;
    propertySize?: string;
    automationTier?: string;
    selectedSystems?: string[];
    estimatedRange?: { min: number; max: number };
  }) => OrderEnquiry;
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  handleLogoClick: () => void; // Redirects to Home page and scrolls to top
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { requireAuth } = useAuth();

  // Navigation State
  const [activeRoute, setActiveRoute] = useState<string>(() => {
    const path = window.location.hash.replace('#', '') || 'home';
    return path.startsWith('/') ? path.slice(1) : path || 'home';
  });
  const [routeParams, setRouteParams] = useState<Record<string, string>>({});

  // Catalog State
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent>(StorageService.getSiteContent());
  const [offers, setOffers] = useState<Offer[]>([]);

  // Customer State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [enquiryModalProduct, setEnquiryModalProduct] = useState<Product | null>(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState<boolean>(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false);
  const [wishlistDrawerOpen, setWishlistDrawerOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const refreshData = useCallback(() => {
    const prods = StorageService.getProducts();
    const cats = StorageService.getCategories();
    const offs = StorageService.getOffers();
    const cont = StorageService.getSiteContent();
    setProducts(prods);
    setCategories(cats);
    setOffers(offs);
    setSiteContent(cont);

    // Sync cart & wishlist items with actual loaded products
    const savedCartRaw = StorageService.getCart();
    const cartItems: CartItem[] = [];
    savedCartRaw.forEach(item => {
      const p = prods.find(prod => prod.id === item.productId);
      if (p) {
        cartItems.push({ product: p, quantity: item.quantity });
      }
    });
    setCart(cartItems);

    const savedWish = StorageService.getWishlist();
    setWishlistIds(savedWish);

    const savedComp = StorageService.getCompare();
    setCompareIds(savedComp);
  }, []);

  useEffect(() => {
    // 1. Initial quick state bootstrap from local cache
    refreshData();

    // 2. Initialise database seeding and setup continuous real-time Firestore listeners
    FirebaseService.seedDatabaseIfNeeded().then(async () => {
      console.log("[Firebase] Setting up real-time listeners...");
      
      const unsubProducts = FirebaseService.syncCollection('products', 'smarthome_products_v2', (items) => {
        setProducts(items as Product[]);
        
        // Sync cart & wishlist items with actual loaded products
        const savedCartRaw = StorageService.getCart();
        const cartItems: CartItem[] = [];
        savedCartRaw.forEach(item => {
          const p = items.find(prod => prod.id === item.productId);
          if (p) {
            cartItems.push({ product: p, quantity: item.quantity });
          }
        });
        setCart(cartItems);
      });

      const unsubCategories = FirebaseService.syncCollection('categories', 'smarthome_categories_v2', (items) => {
        setCategories(items as Category[]);
      });

      const unsubOffers = FirebaseService.syncCollection('offers', 'smarthome_offers_v2', (items) => {
        setOffers(items as Offer[]);
      });

      const unsubBrands = FirebaseService.syncCollection('brands', 'smarthome_brands_v2');
      const unsubFAQs = FirebaseService.syncCollection('faqs', 'smarthome_faqs_v2');
      const unsubVideos = FirebaseService.syncCollection('videos', 'smarthome_videos_v2');
      const unsubEnquiries = FirebaseService.syncCollection('enquiries', 'smarthome_orders_v2');

      const unsubSiteContent = FirebaseService.syncSettingsDoc('siteContent', 'smarthome_site_content_v2', (data) => {
        setSiteContent(data as SiteContent);
      });
      const unsubSeoSettings = FirebaseService.syncSettingsDoc('seoSettings', 'smarthome_seo_settings_v2');
      const unsubConfigSettings = FirebaseService.syncSettingsDoc('configuratorSettings', 'smarthome_configurator_settings_v2');

      // Connection test and verification
      try {
        const testRef = doc(db, 'connection_tests', 'live_verification_token');
        await setDoc(testRef, {
          status: 'success',
          timestamp: new Date().toISOString(),
          message: 'Firestore read/write verification successful!'
        });
        console.log('[Firebase Test] Successfully wrote test document to connection_tests/live_verification_token');
        
        const testSnap = await getDoc(testRef);
        if (testSnap.exists()) {
          console.log('[Firebase Test] Successfully read test document back:', testSnap.data());
          addToast("Firebase Firestore Connection Verified successfully!", "success");
          
          // Clean up the temporary document
          await deleteDoc(testRef);
          console.log('[Firebase Test] Successfully deleted test document.');
        } else {
          console.error('[Firebase Test] Test document not found after writing!');
        }
      } catch (err: any) {
        console.error('[Firebase Test] Connection test failed:', err.message);
      }

      // Cleanup listeners on unmount
      return () => {
        unsubProducts();
        unsubCategories();
        unsubOffers();
        unsubBrands();
        unsubFAQs();
        unsubVideos();
        unsubEnquiries();
        unsubSiteContent();
        unsubSeoSettings();
        unsubConfigSettings();
      };
    }).catch(err => {
      console.error("[Firebase] Error during database sync setup:", err);
    });
  }, [refreshData]);

  // 3. Connect to Unified Backend API & Realtime SSE Stream
  useEffect(() => {
    // Initial fetch from backend
    ApiService.getProducts()
      .then(items => {
        if (items && items.length > 0) {
          setProducts(items);
        }
      })
      .catch(err => console.log('[Backend API] Fallback to cache/Firebase:', err.message));

    ApiService.getCategories()
      .then(cats => {
        if (cats && cats.length > 0) {
          setCategories(cats);
        }
      })
      .catch(() => {});

    ApiService.getOffers()
      .then(offs => {
        if (offs && offs.length > 0) {
          setOffers(offs);
        }
      })
      .catch(() => {});

    // Realtime SSE event listener
    const unsubSSE = ApiService.subscribeToEvents((event) => {
      console.log('[SSE in Storefront] Received event:', event.type);
      if (event.type === 'PRODUCT_CREATED' && event.data) {
        setProducts(prev => {
          const exists = prev.some(p => p.id === event.data.id);
          if (exists) return prev.map(p => p.id === event.data.id ? event.data : p);
          return [event.data, ...prev];
        });
        addToast(`New product added: "${event.data.name}"`, 'info');
      } else if (event.type === 'PRODUCT_UPDATED' && event.data) {
        setProducts(prev => prev.map(p => p.id === event.data.id ? { ...p, ...event.data } : p));
      } else if (event.type === 'PRODUCT_DELETED' && event.data) {
        setProducts(prev => prev.filter(p => p.id !== event.data.id));
      } else if (event.type === 'CATEGORY_MUTATED') {
        ApiService.getCategories().then(setCategories).catch(() => {});
      } else if (event.type === 'OFFER_MUTATED') {
        ApiService.getOffers().then(setOffers).catch(() => {});
      } else if (event.type === 'INVENTORY_CHANGED' && event.data?.products) {
        setProducts(event.data.products);
      }
    });

    return () => {
      unsubSSE();
    };
  }, []);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      const cleanPath = hash.startsWith('/') ? hash.slice(1) : hash;
      const parts = cleanPath.split('/');

      // Redirect any admin hash route back to home homepage
      if (
        cleanPath === 'admin' ||
        cleanPath.startsWith('admin/') ||
        cleanPath === 'secure-management' ||
        cleanPath.startsWith('secure-management/')
      ) {
        window.location.hash = 'home';
        setActiveRoute('home');
        setRouteParams({});
        return;
      }

      if (parts[0] === 'product' && parts[1]) {
        setActiveRoute('product-details');
        setRouteParams({ id: parts[1] });
      } else {
        setActiveRoute(cleanPath || 'home');
        setRouteParams({});
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: string, params: Record<string, string> = {}) => {
    let targetHash = route;
    if (
      route === 'admin' ||
      route.startsWith('admin/') ||
      route === 'secure-management' ||
      route.startsWith('secure-management/')
    ) {
      targetHash = 'home';
      route = 'home';
      params = {};
    }
    if (route === 'product-details' && params.id) {
      targetHash = `product/${params.id}`;
    }
    window.location.hash = targetHash;
    setActiveRoute(route);
    setRouteParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Logo click handler (Redirects to Home page top)
  const handleLogoClick = () => {
    navigateTo('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  // Cart operations (Locked behind authentication!)
  const addToCart = (product: Product, quantity = 1) => {
    requireAuth({
      type: 'add_cart',
      payload: { product, quantity },
      onSuccess: () => {
        setCart(prev => {
          const index = prev.findIndex(item => item.product.id === product.id);
          let newCart: CartItem[];
          if (index > -1) {
            newCart = [...prev];
            newCart[index].quantity += quantity;
          } else {
            newCart = [...prev, { product, quantity }];
          }
          StorageService.saveCart(newCart.map(i => ({ productId: i.product.id, quantity: i.quantity })));
          return newCart;
        });
        addToast(`Added "${product.name}" to Cart Enquiry`);
        setCartDrawerOpen(true);
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const filtered = prev.filter(item => item.product.id !== productId);
      StorageService.saveCart(filtered.map(i => ({ productId: i.product.id, quantity: i.quantity })));
      return filtered;
    });
    addToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => {
      const updated = prev.map(item => item.product.id === productId ? { ...item, quantity } : item);
      StorageService.saveCart(updated.map(i => ({ productId: i.product.id, quantity: i.quantity })));
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    StorageService.saveCart([]);
  };

  // Wishlist operations (Locked behind authentication!)
  const toggleWishlist = (product: Product) => {
    requireAuth({
      type: 'add_wishlist',
      payload: product,
      onSuccess: () => {
        setWishlistIds(prev => {
          const exists = prev.includes(product.id);
          let next: string[];
          if (exists) {
            next = prev.filter(id => id !== product.id);
            addToast(`Removed "${product.name}" from Wishlist`, 'info');
          } else {
            next = [...prev, product.id];
            addToast(`Saved "${product.name}" to Wishlist`);
          }
          StorageService.saveWishlist(next);
          return next;
        });
      }
    });
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  // Compare operations
  const toggleCompare = (product: Product) => {
    setCompareIds(prev => {
      const exists = prev.includes(product.id);
      let next: string[];
      if (exists) {
        next = prev.filter(id => id !== product.id);
        addToast(`Removed "${product.name}" from Compare list`, 'info');
      } else {
        if (prev.length >= 4) {
          addToast('You can compare a maximum of 4 products at once.', 'error');
          return prev;
        }
        next = [...prev, product.id];
        addToast(`Added "${product.name}" to Compare list`);
      }
      StorageService.saveCompare(next);
      return next;
    });
  };

  const isInCompare = (productId: string) => compareIds.includes(productId);

  // Quick View & Enquiry Modals
  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const openEnquiryModal = (product?: Product) => {
    if (product) {
      setEnquiryModalProduct(product);
    } else {
      setEnquiryModalProduct(null);
    }
    setEnquiryModalOpen(true);
  };
  const closeEnquiryModal = () => setEnquiryModalOpen(false);

  const toggleCartDrawer = (open?: boolean) => setCartDrawerOpen(prev => open !== undefined ? open : !prev);
  const toggleWishlistDrawer = (open?: boolean) => setWishlistDrawerOpen(prev => open !== undefined ? open : !prev);

  // Submit Enquiry Order
  const submitEnquiry = (enquiryData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    type: OrderEnquiry['type'];
    items: { productId: string; productName: string; sku: string; quantity: number; price: number; image?: string }[];
    totalAmount: number;
    address?: string;
    city?: string;
    notes?: string;
    consultationType?: string;
    preferredDate?: string;
    preferredTime?: string;
    propertyType?: string;
    propertySize?: string;
    automationTier?: string;
    selectedSystems?: string[];
    estimatedRange?: { min: number; max: number };
  }): OrderEnquiry => {
    const created = StorageService.addOrderEnquiry(enquiryData);
    
    const isPaid = (enquiryData as any).paymentStatus === 'Paid';
    // Broadcast order/enquiry to unified backend
    ApiService.createOrder({
      orderNumber: created.enquiryNumber,
      customerName: enquiryData.customerName,
      customerEmail: enquiryData.customerEmail,
      customerPhone: enquiryData.customerPhone,
      city: enquiryData.city,
      address: enquiryData.address,
      items: enquiryData.items,
      totalAmount: enquiryData.totalAmount,
      orderStatus: (enquiryData as any).orderStatus || (isPaid ? 'Paid' : 'Confirmed'),
      paymentStatus: (enquiryData as any).paymentStatus || (enquiryData.type === 'purchase' ? 'Paid' : 'Pending'),
      type: enquiryData.type || 'enquiry',
      notes: enquiryData.notes,
      razorpayOrderId: (enquiryData as any).paymentOrderId,
      razorpayPaymentId: (enquiryData as any).paymentId,
      paymentSignature: (enquiryData as any).paymentSignature
    }).catch(e => console.warn('[Backend Order Sync]:', e.message));

    addToast(`Enquiry #${created.enquiryNumber} sent successfully!`, 'success');
    return created;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        cart,
        wishlistIds,
        compareIds,
        siteContent,
        offers,
        searchQuery,
        activeRoute,
        routeParams,
        quickViewProduct,
        enquiryModalProduct,
        enquiryModalOpen,
        cartDrawerOpen,
        wishlistDrawerOpen,
        toasts,
        refreshData,
        setSearchQuery,
        navigateTo,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        toggleCompare,
        isInCompare,
        openQuickView,
        closeQuickView,
        openEnquiryModal,
        closeEnquiryModal,
        toggleCartDrawer,
        toggleWishlistDrawer,
        submitEnquiry,
        addToast,
        showToast: addToast,
        removeToast,
        handleLogoClick,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
