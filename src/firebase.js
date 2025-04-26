// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAVSxb_0u7ibwAapIQu9sB9jIp-MFG8kqI",
//   authDomain: "af2-country.firebaseapp.com",
//   projectId: "af2-country",
//   storageBucket: "af2-country.firebasestorage.app",
//   messagingSenderId: "989445718450",
//   appId: "1:989445718450:web:8879161bda927969d924ab",
//   measurementId: "G-8RCSLVK4ED"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAVSxb_0u7ibwAapIQu9sB9jIp-MFG8kqI",
  authDomain: "af2-country.firebaseapp.com",
  projectId: "af2-country",
  storageBucket: "af2-country.firebasestorage.app",
  messagingSenderId: "989445718450",
  appId: "1:989445718450:web:8879161bda927969d924ab",
  measurementId: "G-8RCSLVK4ED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export both app and auth
export const auth = getAuth(app);
export default app; // 👈 This is what you need for Firestore

