// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJPiGz6ZlW_RLD96ZG-hfBxupi34Yfso4",
  authDomain: "fir-fighter-8035e.firebaseapp.com",
  projectId: "fir-fighter-8035e",
  storageBucket: "fir-fighter-8035e.firebasestorage.app",
  messagingSenderId: "1093491693309",
  appId: "1:1093491693309:web:8034adc32cee1ee485d094"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);