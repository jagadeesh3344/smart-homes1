import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import appletConfig from '../../firebase-applet-config.json';

const firebaseConfig = {
  apiKey: (import.meta as any).env.VITE_FIREBASE_API_KEY || appletConfig.apiKey || "AIzaSyDummyKeyPlaceholder_ChangeMeInSecrets",
  authDomain: (import.meta as any).env.VITE_FIREBASE_AUTH_DOMAIN || appletConfig.authDomain || "smarthomes-366443.firebaseapp.com",
  projectId: (import.meta as any).env.VITE_FIREBASE_PROJECT_ID || appletConfig.projectId || "smarthomes-366443",
  storageBucket: (import.meta as any).env.VITE_FIREBASE_STORAGE_BUCKET || appletConfig.storageBucket || "smarthomes-366443.appspot.com",
  messagingSenderId: (import.meta as any).env.VITE_FIREBASE_MESSAGING_SENDER_ID || appletConfig.messagingSenderId || "123456789012",
  appId: (import.meta as any).env.VITE_FIREBASE_APP_ID || appletConfig.appId || "1:123456789012:web:abcd1234efgh5678"
};

// Enforce project ID is smarthomes-366443 for production robustness
if (firebaseConfig.projectId !== "smarthomes-366443") {
  console.warn(`[FirebaseConfig] Project ID changed from ${firebaseConfig.projectId} to smarthomes-366443 for runtime verification.`);
  firebaseConfig.projectId = "smarthomes-366443";
}

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Use custom Firestore Database ID only if it is NOT the default database
const rawDatabaseId = (import.meta as any).env.VITE_FIREBASE_DATABASE_ID || appletConfig.firestoreDatabaseId;
const databaseId = (!rawDatabaseId || rawDatabaseId === 'default' || rawDatabaseId === '(default)') ? undefined : rawDatabaseId;

// Initialize Firestore with persistent offline cache to support instant loading
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
}, databaseId);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { app, db, auth };
