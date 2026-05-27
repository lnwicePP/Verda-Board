// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoxljj20iSwVA1RC6twXG8RZn5M2O0FJ4",
  authDomain: "verda-board-2937f.firebaseapp.com",
  projectId: "verda-board-2937f",
  storageBucket: "verda-board-2937f.firebasestorage.app",
  messagingSenderId: "735912775122",
  appId: "1:735912775122:web:6c06ac657059c6de000c0b",
  measurementId: "G-JHHLHCDRWS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);