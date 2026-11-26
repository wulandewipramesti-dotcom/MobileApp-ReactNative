
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAMV7z-2tPj9SCVHufOKFsMHE-jbX5vU1E",
  authDomain: "mobileapp-b304f.firebaseapp.com",
  projectId: "mobileapp-b304f",
  storageBucket: "mobileapp-b304f.firebasestorage.app",
  messagingSenderId: "728304437607",
  appId: "1:728304437607:web:cdfe9965fbbcf792dfc7c2"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
