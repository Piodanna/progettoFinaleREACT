// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArsVTLV6kZx2P0azY2oT6VGVksndx01xg",
  authDomain: "progettofinale-9a3bf.firebaseapp.com",
  projectId: "progettofinale-9a3bf",
  storageBucket: "progettofinale-9a3bf.appspot.com",
  messagingSenderId: "90440131106",
  appId: "1:90440131106:web:5887d57ba3490c5179607b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);