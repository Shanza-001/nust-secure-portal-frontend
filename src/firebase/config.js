// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgxx49mnWeLAlGNEzwTbMKCcom_Z8J3cY",
  authDomain: "nust--portal.firebaseapp.com",
  projectId: "nust--portal",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "nust--portal.firebasestorage.app",
  appId: "G-D017E722GT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db = getFirestore(app);