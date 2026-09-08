/**
 * Centralized API Client for SmartHomes Admin Console
 * Communicates with the Unified Backend on port 5000 (Localhost, Mobile LAN, or Vercel)
 */

import { Product, Category, Order, Offer, FAQ, Video, SystemSettings, HomepageConfig, SEOConfig } from '../types';

export const getApiBaseUrl = (): string => {
  const envUrl = (import.meta as any).env?.VITE_API_URL;
  if (envUrl && envUrl.trim() !== '') {
    return envUrl.endsWith('/') ? envUrl.slice(0, -1) : envUrl;
  }
  if (typeof window !== 'undefined' && window.location) {
    const hostname = window.location.hostname || 'localhost';
    // If accessing via public tunnel (loca.lt, ngrok, cloudflare) or custom domain,
    // route through the frontend reverse proxy for 100% SSL & network firewall resilience
    if (hostname.includes('.') && !/^\d+\.\d+\.\d+\.\d+$/.test(hostname) && hostname !== 'localhost') {
      return window.location.origin;
    }
    return `http://${hostname}:5000`;
  }
  return 'http://localhost:5000';
};

export const AdminApiService = {
  getBaseUrl: getApiBaseUrl,

  // --- PRODUCTS ---
  async getProducts(): Promise<Product[]> {
    const res = await fetch(`${getApiBaseUrl()}/api/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async saveProduct(product: Partial<Product>): Promise<Product> {
    const res = await fetch(`${getApiBaseUrl()}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (!res.ok) throw new Error('Failed to save product to backend');
    return res.json();
  },

  async deleteProduct(id: string): Promise<boolean> {
    const res = await fetch(`${getApiBaseUrl()}/api/products/${id}`, {
      method: 'DELETE'
    });
    return res.ok;
  },

  // --- CATEGORIES ---
  async getCategories(): Promise<Category[]> {
    const res = await fetch(`${getApiBaseUrl()}/api/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },

  async saveCategory(category: Partial<Category>): Promise<Category> {
    const res = await fetch(`${getApiBaseUrl()}/api/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category)
    });
    if (!res.ok) throw new Error('Failed to save category');
    return res.json();
  },

  async deleteCategory(id: string): Promise<boolean> {
    const res = await fetch(`${getApiBaseUrl()}/api/categories/${id}`, {
      method: 'DELETE'
    });
    return res.ok;
  },

  // --- ORDERS ---
  async getOrders(): Promise<Order[]> {
    const res = await fetch(`${getApiBaseUrl()}/api/orders`);
    if (!res.ok) throw new Error('Failed to fetch orders');
    return res.json();
  },

  async updateOrderStatus(id: string, updates: { orderStatus?: string; paymentStatus?: string }): Promise<Order> {
    const res = await fetch(`${getApiBaseUrl()}/api/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update order status');
    return res.json();
  },

  // --- CMS & SETTINGS ---
  async saveHomepage(config: HomepageConfig): Promise<any> {
    const res = await fetch(`${getApiBaseUrl()}/api/cms/homepage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    });
    return res.json();
  },

  async saveSettings(settings: SystemSettings): Promise<any> {
    const res = await fetch(`${getApiBaseUrl()}/api/cms/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    return res.json();
  },

  async saveOffer(offer: Offer): Promise<any> {
    const res = await fetch(`${getApiBaseUrl()}/api/cms/offers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(offer)
    });
    return res.json();
  },

  async saveFAQ(faq: FAQ): Promise<any> {
    const res = await fetch(`${getApiBaseUrl()}/api/cms/faqs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(faq)
    });
    return res.json();
  },

  async saveVideo(video: Video): Promise<any> {
    const res = await fetch(`${getApiBaseUrl()}/api/cms/videos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(video)
    });
    return res.json();
  },

  // --- REALTIME SSE STREAM FOR ADMIN NOTIFICATIONS ---
  subscribeToEvents(onEvent: (event: { type: string; data: any }) => void): () => void {
    if (typeof window === 'undefined' || typeof EventSource === 'undefined') {
      return () => {};
    }

    const sseUrl = `${getApiBaseUrl()}/api/events`;
    console.log(`[Admin SSE] Listening to live events at ${sseUrl}`);

    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource(sseUrl);

      eventSource.onmessage = (msg) => {
        try {
          const parsed = JSON.parse(msg.data);
          onEvent(parsed);
        } catch (e) {
          console.warn('[Admin SSE] Failed to parse message:', msg.data);
        }
      };

      eventSource.onerror = (err) => {
        console.warn('[Admin SSE] Connection error (retrying in background):', err);
      };
    } catch (e) {
      console.warn('[Admin SSE] Error initializing stream:', e);
    }

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }
};
