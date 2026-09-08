/**
 * Centralized API Client for Aetheria Smart Home Storefront
 * Dynamically resolves backend URL across Localhost, Mobile LAN, and Vercel
 */

import { Product, Category, Offer, OrderEnquiry } from '../types';

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

export const ApiService = {
  getBaseUrl: getApiBaseUrl,

  async getProducts(params?: { categoryId?: string; search?: string; featured?: boolean }): Promise<Product[]> {
    const url = new URL(`${getApiBaseUrl()}/api/products`);
    if (params?.categoryId) url.searchParams.set('categoryId', params.categoryId);
    if (params?.search) url.searchParams.set('search', params.search);
    if (params?.featured) url.searchParams.set('featured', 'true');

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`Failed to fetch products: ${res.statusText}`);
    return res.json();
  },

  async getProductById(id: string): Promise<Product> {
    const res = await fetch(`${getApiBaseUrl()}/api/products/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch product ${id}`);
    return res.json();
  },

  async getCategories(): Promise<Category[]> {
    const res = await fetch(`${getApiBaseUrl()}/api/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },

  async getOffers(): Promise<Offer[]> {
    const res = await fetch(`${getApiBaseUrl()}/api/cms/offers`);
    if (!res.ok) throw new Error('Failed to fetch offers');
    return res.json();
  },

  async getSiteContent(): Promise<any> {
    const res = await fetch(`${getApiBaseUrl()}/api/cms/settings`);
    if (!res.ok) throw new Error('Failed to fetch site settings');
    return res.json();
  },

  async createOrder(orderPayload: any): Promise<any> {
    const res = await fetch(`${getApiBaseUrl()}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to submit order');
    }
    return res.json();
  },

  async createRazorpayOrder(params: number | { amount: number; currency?: string; receipt?: string; items?: any[] }, receipt?: string): Promise<any> {
    const payload = typeof params === 'number' ? { amount: params, receipt } : params;
    const res = await fetch(`${getApiBaseUrl()}/api/payment/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create payment order');
    }
    return res.json();
  },

  async verifyRazorpayPayment(payload: any): Promise<any> {
    const res = await fetch(`${getApiBaseUrl()}/api/payment/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  /**
   * Connect to backend Server-Sent Events (SSE) stream for instant real-time updates!
   */
  subscribeToEvents(onEvent: (event: { type: string; data: any }) => void): () => void {
    if (typeof window === 'undefined' || typeof EventSource === 'undefined') {
      return () => {};
    }

    const sseUrl = `${getApiBaseUrl()}/api/events`;
    console.log(`[API SSE] Connecting to real-time events at ${sseUrl}`);
    
    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource(sseUrl);

      eventSource.onopen = () => {
        console.log('[API SSE] Stream successfully opened');
      };

      eventSource.onmessage = (msg) => {
        try {
          const parsed = JSON.parse(msg.data);
          onEvent(parsed);
        } catch (e) {
          console.warn('[API SSE] Failed to parse message:', msg.data);
        }
      };

      eventSource.onerror = (err) => {
        console.warn('[API SSE] Stream connection error (retrying in background):', err);
      };
    } catch (e) {
      console.warn('[API SSE] EventSource initialization failed:', e);
    }

    return () => {
      if (eventSource) {
        eventSource.close();
        console.log('[API SSE] Disconnected from stream');
      }
    };
  }
};
