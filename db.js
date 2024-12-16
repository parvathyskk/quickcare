// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgC7eK1-jwDwXqHfmHb3MjPNnBlcjQWr8",
  authDomain: "scraplink-9ce04.firebaseapp.com",
  projectId: "scraplink-9ce04",
  storageBucket: "scraplink-9ce04.firebasestorage.app",
  messagingSenderId: "406914882192",
  appId: "1:406914882192:web:d44e6d7339a743ddecd615",
  measurementId: "G-9KZH10B9BM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);