import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfz7VInCRSV4zoZ3MStDETBrYsjYWOrAI",
  authDomain: "gigagyat1.firebaseapp.com",
  projectId: "gigagyat1",
  storageBucket: "gigagyat1.firebasestorage.app",
  messagingSenderId: "7757857926",
  appId: "1:7757857926:web:fb6218c4d82e5ebe29bd07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export firestore database
export const db = getFirestore(app);