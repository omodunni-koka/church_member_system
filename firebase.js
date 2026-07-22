import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCO3BHBw428324ElHa9_Sfi068uq4kEmZw",
  authDomain: "rccg-tems.firebaseapp.com",
  projectId: "rccg-tems",
  storageBucket: "rccg-tems.firebasestorage.app",
  messagingSenderId: "365168815362",
  appId: "1:365168815362:web:55ba0cbe89b2bf9aeba61b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore Database
const db = getFirestore(app);

export { db , storage};