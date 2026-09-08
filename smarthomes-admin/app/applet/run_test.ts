import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

const config = {
  apiKey: "AIzaSyAjBFEBiqpjzROtjk8-FgqUIzwwvHcTFr0",
  authDomain: "smarthomes-366443.firebaseapp.com",
  projectId: "smarthomes-366443",
  storageBucket: "smarthomes-366443.appspot.com",
  messagingSenderId: "648256630099",
  appId: "1:648256630099:web:0a285d4edf508509e645a6"
};

async function runTest() {
  console.log("INITIALIZING FIREBASE...");
  console.log("Project ID:", config.projectId);
  
  try {
    const app = initializeApp(config);
    const db = getFirestore(app);
    console.log("Firestore initialized successfully.");
    
    const docRef = doc(db, "connection_tests", "firebase-admin-test");
    
    console.log("STEP 1: PERFORMING WRITE...");
    await setDoc(docRef, {
      test: true,
      source: "admin-panel",
      timestamp: new Date().toISOString()
    });
    console.log("WRITE SUCCESSFUL!");

    console.log("STEP 2: PERFORMING READ...");
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      console.log("READ SUCCESSFUL! Document data:", snap.data());
    } else {
      console.error("READ FAILED: Document does not exist!");
    }

    console.log("STEP 3: PERFORMING DELETE...");
    await deleteDoc(docRef);
    console.log("DELETE SUCCESSFUL!");

    console.log("ALL FIRESTORE OPERATIONS PASSED!");
  } catch (err: any) {
    console.error("FIRESTORE OPERATION FAILED:", err?.message || err);
  }
}

runTest();
