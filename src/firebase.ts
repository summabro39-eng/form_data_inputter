// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIEQsRaWFLnvPuBRk9Qy2688HGgYQ4HNw",
  authDomain: "form-ad909.firebaseapp.com",
  databaseURL: "https://form-ad909-default-rtdb.firebaseio.com",
  projectId: "form-ad909",
  storageBucket: "form-ad909.firebasestorage.app",
  messagingSenderId: "174084308689",
  appId: "1:174084308689:web:e3b5de5c8aaba6cb86cff0",
  measurementId: "G-1ZXFN7R91H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };