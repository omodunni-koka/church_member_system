// ================================
// FIREBASE CONFIG
// ================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";


// ================================
// FIREBASE CONFIGURATION
// ================================

const firebaseConfig = {
  apiKey: "AIzaSyCO3BHBw428324ElHa9_Sfi068uq4kEmZw",
  authDomain: "rccg-tems.firebaseapp.com",
  projectId: "rccg-tems",
  storageBucket: "rccg-tems.appspot.com",
  messagingSenderId: "365168815362",
  appId: "1:365168815362:web:55ba0cbe89b2bf9aeba61b"
};


// ================================
// INITIALIZE FIREBASE
// ================================

const app = initializeApp(firebaseConfig);


// ================================
// FIRESTORE DATABASE
// ================================

const db = getFirestore(app);


// ================================
// FIREBASE STORAGE
// ================================

const storage = getStorage(app);


// ================================
// EXPORTS
// ================================

export { db, storage };