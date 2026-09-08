import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getFirestore, 
  Firestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  limit, 
  serverTimestamp,
  doc,
  writeBatch,
  deleteDoc
} from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

// Static fallbacks specifically for smarthomes-366443
const FALLBACK_PROJECT_ID = 'smarthomes-366443';

export interface FirebaseConfigParams {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Check local storage for overrides first
const STORAGE_OVERRIDE_KEY = 'smarthomes_admin_firebase_config';

export function getSavedFirebaseConfig(): Partial<FirebaseConfigParams> {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return {};
  }
  const saved = localStorage.getItem(STORAGE_OVERRIDE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // ignore
    }
  }
  return {};
}

export function saveFirebaseConfig(config: Partial<FirebaseConfigParams>): void {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_OVERRIDE_KEY, JSON.stringify(config));
  }
}

export function clearFirebaseConfig(): void {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.removeItem(STORAGE_OVERRIDE_KEY);
  }
}

function cleanValue(val: string | undefined | null): string {
  if (!val) return '';
  let cleaned = String(val).trim();
  if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
    cleaned = cleaned.slice(1, -1);
  }
  if (cleaned.startsWith("'") && cleaned.endsWith("'")) {
    cleaned = cleaned.slice(1, -1);
  }
  return cleaned.trim();
}

function getEnvVar(key: string): string {
  if (typeof window !== 'undefined') {
    const metaEnv = (import.meta as any).env || {};
    if (metaEnv[key]) return String(metaEnv[key]);
  }
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return String(process.env[key]);
  }
  const metaEnv = (import.meta as any).env || {};
  if (metaEnv[key]) return String(metaEnv[key]);
  return '';
}

// Assemble configuration with hierarchy: Saved override > Environment vars > Fallback template
export function getActiveFirebaseConfig(): FirebaseConfigParams {
  const overrides = getSavedFirebaseConfig();
  
  const rawApiKey = overrides.apiKey || getEnvVar('VITE_FIREBASE_API_KEY');
  const rawAuthDomain = overrides.authDomain || getEnvVar('VITE_FIREBASE_AUTH_DOMAIN') || `${FALLBACK_PROJECT_ID}.firebaseapp.com`;
  const rawProjectId = overrides.projectId || getEnvVar('VITE_FIREBASE_PROJECT_ID') || FALLBACK_PROJECT_ID;
  const rawStorageBucket = overrides.storageBucket || getEnvVar('VITE_FIREBASE_STORAGE_BUCKET') || `${FALLBACK_PROJECT_ID}.appspot.com`;
  const rawMessagingSenderId = overrides.messagingSenderId || getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID');
  const rawAppId = overrides.appId || getEnvVar('VITE_FIREBASE_APP_ID');

  const apiKey = cleanValue(rawApiKey);
  const authDomain = cleanValue(rawAuthDomain);
  let projectId = cleanValue(rawProjectId);
  const storageBucket = cleanValue(rawStorageBucket);
  const messagingSenderId = cleanValue(rawMessagingSenderId);
  const appId = cleanValue(rawAppId);

  // Dynamic project ID self-healing: if authDomain has the correct subdomain (e.g. smarthomes-36643) 
  // but projectId has the typo variant (smarthomes-366443), correct it to match the credentials project.
  if (authDomain && authDomain.includes('.firebaseapp.com')) {
    const subdomain = authDomain.split('.firebaseapp.com')[0].trim();
    if (subdomain && subdomain !== projectId) {
      console.warn(`[Firebase Configuration] Automatically aligning projectId "${projectId}" with authDomain project identifier "${subdomain}".`);
      projectId = subdomain;
    }
  }

  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
  };
}

let appInstance: FirebaseApp | null = null;
let firestoreInstance: Firestore | null = null;
let authInstance: Auth | null = null;

export function initializeFirebase(): { app: FirebaseApp; db: Firestore; auth: Auth } {
  const config = getActiveFirebaseConfig();
  
  // Enforce API key check to prevent crashes
  if (!config.apiKey) {
    throw new Error('Firebase API Key is missing. Please set VITE_FIREBASE_API_KEY or save it in the Database Test Panel.');
  }

  try {
    if (getApps().length === 0) {
      appInstance = initializeApp(config);
    } else {
      appInstance = getApp();
    }
    firestoreInstance = getFirestore(appInstance);
    authInstance = getAuth(appInstance);
    return { app: appInstance, db: firestoreInstance, auth: authInstance };
  } catch (error) {
    console.error('Failed to initialize Firebase SDK:', error);
    throw error;
  }
}

export function getDb(): Firestore {
  if (!firestoreInstance) {
    const { db } = initializeFirebase();
    return db;
  }
  return firestoreInstance;
}

export function getAuthInstance(): Auth {
  if (!authInstance) {
    const { auth } = initializeFirebase();
    return auth;
  }
  return authInstance;
}

export function isFirebaseConfigured(): boolean {
  const config = getActiveFirebaseConfig();
  return !!config.apiKey && !!config.projectId;
}

/**
 * Executes a write/read connection test into '/connection_tests'
 * to verify complete CRUD authorization for the SmartHomes project.
 */
export async function testFirebaseConnection(): Promise<{ success: boolean; latency: number; error?: string }> {
  const start = Date.now();
  try {
    const db = getDb();
    const testCol = collection(db, 'connection_tests');
    
    // Write test document
    const docRef = await addDoc(testCol, {
      testedBy: 'SmartHomes Admin Panel',
      timestamp: serverTimestamp(),
      testMessage: 'Connecting directly to smarthomes-366443 ledger system'
    });
    
    // Read test document back
    const q = query(testCol, limit(1));
    await getDocs(q);

    // Clean up instantly to prevent database clutter
    try {
      await deleteDoc(docRef);
    } catch (e) {
      console.warn('Failed to delete connection test document:', e);
    }
    
    const latency = Date.now() - start;
    return { success: true, latency };
  } catch (err: any) {
    console.error('Firebase connection test failure:', err);
    return { 
      success: false, 
      latency: Date.now() - start, 
      error: err?.message || 'Access denied. Please check security rules on smarthomes-366443 or configuration fields.' 
    };
  }
}
