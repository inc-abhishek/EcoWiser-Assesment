import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDBb5NvKSTQy6uOvC6o-bkVjVW8FhLmRY",
  authDomain: "brand-product-manager.firebaseapp.com",
  projectId: "brand-product-manager",
  storageBucket: "brand-product-manager.firebasestorage.app",
  messagingSenderId: "538405036162",
  appId: "1:538405036162:web:ac170c5688b65cf3b7d49b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);