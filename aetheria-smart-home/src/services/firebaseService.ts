import { db } from '../lib/firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  writeBatch,
  query,
  onSnapshot
} from 'firebase/firestore';

// Import initial data structures for database seeding
import { initialCategories, initialProducts } from '../data/catalogueData';
import { initialServices } from '../data/servicesData';
import { initialProjects } from '../data/projectsData';
import { defaultFAQs, defaultVideos } from './storage';
import { defaultConfiguratorSettings, defaultSiteContent } from './storage';

// Default static list of Brands
export interface Brand {
  id: string;
  name: string;
  sub: string;
}

const defaultBrands: Brand[] = [
  { id: 'b1', name: 'LUTRON', sub: 'Architectural Shading' },
  { id: 'b2', name: 'CRESTRON', sub: 'Ecosystem Controllers' },
  { id: 'b3', name: 'BANG & OLUFSEN', sub: 'High-Fidelity Audio' },
  { id: 'b4', name: 'SAVANT', sub: 'Elite Smart Home' },
  { id: 'b5', name: 'SONOS', sub: 'Wireless Multi-Room' },
  { id: 'b6', name: 'KNX', sub: 'Wired Bus Systems' }
];

export const FirebaseService = {
  /**
   * Seeds Firestore with default assets if collections are empty.
   */
  async seedDatabaseIfNeeded() {
    try {
      console.log("[Firebase] Seeding checked/bypassed for categories & products.");

      // 3. Brands
      const brandsSnap = await getDocs(collection(db, 'brands'));
      if (brandsSnap.empty) {
        console.log("[Firebase] Seeding 'brands' collection...");
        const batch = writeBatch(db);
        defaultBrands.forEach(brand => {
          batch.set(doc(db, 'brands', brand.id), brand);
        });
        await batch.commit();
      }

      // 4. FAQs
      const faqsSnap = await getDocs(collection(db, 'faqs'));
      if (faqsSnap.empty) {
        console.log("[Firebase] Seeding 'faqs' collection...");
        const batch = writeBatch(db);
        defaultFAQs.forEach(faq => {
          batch.set(doc(db, 'faqs', faq.id), faq);
        });
        await batch.commit();
      }

      // 5. Videos
      const videosSnap = await getDocs(collection(db, 'videos'));
      if (videosSnap.empty) {
        console.log("[Firebase] Seeding 'videos' collection...");
        const batch = writeBatch(db);
        defaultVideos.forEach(vid => {
          batch.set(doc(db, 'videos', vid.id), vid);
        });
        await batch.commit();
      }

      // 6. Settings Document
      const siteContentRef = doc(db, 'settings', 'siteContent');
      const siteContentSnap = await getDoc(siteContentRef);
      if (!siteContentSnap.exists()) {
        console.log("[Firebase] Seeding settings/siteContent...");
        await setDoc(siteContentRef, defaultSiteContent);
      }

      const seoRef = doc(db, 'settings', 'seoSettings');
      const seoSnap = await getDoc(seoRef);
      if (!seoSnap.exists()) {
        console.log("[Firebase] Seeding settings/seoSettings...");
        await setDoc(seoRef, {
          title: "Aetheria Smart Home | Absolute Intelligent Architecture",
          description: "Premium luxury smart home automation system orchestrations, tuneable circadian track spots, biometric entries, and custom sound stages.",
          keywords: "smart home, home automation, lutron, crestron, bang & olufsen, luxurio, smart switches",
          ogImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
        });
      }

      const configRef = doc(db, 'settings', 'configuratorSettings');
      const configSnap = await getDoc(configRef);
      if (!configSnap.exists()) {
        console.log("[Firebase] Seeding settings/configuratorSettings...");
        await setDoc(configRef, defaultConfiguratorSettings);
      }

      console.log("[Firebase] Seeding check completed successfully!");
    } catch (error: any) {
      if (error.code === 'permission-denied' || error.message?.includes('permission') || error.message?.includes('denied')) {
        console.log("[Firebase] Seeding bypassed: database is securely locked under Zero-Trust security rules.");
      } else {
        console.warn("[Firebase] Error seeding Firestore collections:", error.message || error);
      }
    }
  },

  /**
   * Sets up real-time listener to automatically synchronize a collection down to localStorage and triggers callbacks.
   */
  syncCollection(collectionName: string, localStorageKey: string, onUpdate?: (data: any[]) => void) {
    const q = query(collection(db, collectionName));
    return onSnapshot(q, (snapshot) => {
      const items: any[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      localStorage.setItem(localStorageKey, JSON.stringify(items));
      if (onUpdate) onUpdate(items);
    }, (error: any) => {
      if (error.code === 'permission-denied' || error.message?.includes('permission') || error.message?.includes('denied')) {
        console.log(`[Firebase] Sync for collection '${collectionName}' bypassed (database is securely locked under Zero-Trust rules).`);
      } else {
        console.warn(`[Firebase] Error syncing collection '${collectionName}':`, error.message || error);
      }
    });
  },

  /**
   * Sets up a real-time listener to sync individual settings documents.
   */
  syncSettingsDoc(docId: string, localStorageKey: string, onUpdate?: (data: any) => void) {
    return onSnapshot(doc(db, 'settings', docId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        localStorage.setItem(localStorageKey, JSON.stringify(data));
        if (onUpdate) onUpdate(data);
      }
    }, (error: any) => {
      if (error.code === 'permission-denied' || error.message?.includes('permission') || error.message?.includes('denied')) {
        console.log(`[Firebase] Sync for settings document '${docId}' bypassed (database is securely locked under Zero-Trust rules).`);
      } else {
        console.warn(`[Firebase] Error syncing settings document '${docId}':`, error.message || error);
      }
    });
  },

  // WRITE OPERATIONS WRAPPERS (To execute writes immediately on Firestore as source of truth)
  async saveProduct(id: string, data: any) {
    try {
      await setDoc(doc(db, 'products', id), data, { merge: true });
    } catch (e) {
      console.error("[Firebase] Error saving product:", e);
    }
  },

  async deleteProduct(id: string) {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (e) {
      console.error("[Firebase] Error deleting product:", e);
    }
  },

  async saveCategory(id: string, data: any) {
    try {
      await setDoc(doc(db, 'categories', id), data, { merge: true });
    } catch (e) {
      console.error("[Firebase] Error saving category:", e);
    }
  },

  async deleteCategory(id: string) {
    try {
      await deleteDoc(doc(db, 'categories', id));
    } catch (e) {
      console.error("[Firebase] Error deleting category:", e);
    }
  },

  async saveBrand(id: string, data: any) {
    try {
      await setDoc(doc(db, 'brands', id), data, { merge: true });
    } catch (e) {
      console.error("[Firebase] Error saving brand:", e);
    }
  },

  async deleteBrand(id: string) {
    try {
      await deleteDoc(doc(db, 'brands', id));
    } catch (e) {
      console.error("[Firebase] Error deleting brand:", e);
    }
  },

  async saveEnquiry(id: string, data: any) {
    try {
      await setDoc(doc(db, 'enquiries', id), data, { merge: true });
    } catch (e) {
      console.error("[Firebase] Error saving enquiry:", e);
    }
  },

  async deleteEnquiry(id: string) {
    try {
      await deleteDoc(doc(db, 'enquiries', id));
    } catch (e) {
      console.error("[Firebase] Error deleting enquiry:", e);
    }
  },

  async saveOffer(id: string, data: any) {
    try {
      await setDoc(doc(db, 'offers', id), data, { merge: true });
    } catch (e) {
      console.error("[Firebase] Error saving offer:", e);
    }
  },

  async deleteOffer(id: string) {
    try {
      await deleteDoc(doc(db, 'offers', id));
    } catch (e) {
      console.error("[Firebase] Error deleting offer:", e);
    }
  },

  async saveFAQ(id: string, data: any) {
    try {
      await setDoc(doc(db, 'faqs', id), data, { merge: true });
    } catch (e) {
      console.error("[Firebase] Error saving FAQ:", e);
    }
  },

  async deleteFAQ(id: string) {
    try {
      await deleteDoc(doc(db, 'faqs', id));
    } catch (e) {
      console.error("[Firebase] Error deleting FAQ:", e);
    }
  },

  async saveVideo(id: string, data: any) {
    try {
      await setDoc(doc(db, 'videos', id), data, { merge: true });
    } catch (e) {
      console.error("[Firebase] Error saving video:", e);
    }
  },

  async deleteVideo(id: string) {
    try {
      await deleteDoc(doc(db, 'videos', id));
    } catch (e) {
      console.error("[Firebase] Error deleting video:", e);
    }
  },

  async saveSettingsDoc(docId: string, data: any) {
    try {
      await setDoc(doc(db, 'settings', docId), data, { merge: true });
    } catch (e) {
      console.error(`[Firebase] Error saving settings document '${docId}':`, e);
    }
  }
};
