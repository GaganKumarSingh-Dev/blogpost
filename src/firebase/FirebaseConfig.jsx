// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwRwb92lrUDb80LZnLtdbSCEjY_GcAKyg",
  authDomain: "react-blog-20667.firebaseapp.com",
  projectId: "react-blog-20667",
  storageBucket: "react-blog-20667.appspot.com",
  messagingSenderId: "865255321755",
  appId: "1:865255321755:web:f63b8db1337464292c563e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth};