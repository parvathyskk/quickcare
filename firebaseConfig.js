// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBgC7eK1-jwDwXqHfmHb3MjPNnBlcjQWr8",
    authDomain: "scraplink-9ce04.firebaseapp.com",
    projectId: "scraplink-9ce04",
    storageBucket: "scraplink-9ce04.appspot.com",
    messagingSenderId: "406914882192",
    appId: "1:406914882192:web:3d429db720b3821decd615",
    measurementId: "G-G9M68432JZ",
    databaseURL:"https://console.firebase.google.com/u/1/project/scraplink-9ce04/database/scraplink-9ce04-default-rtdb/data/~2F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get and export the database instance
export const database = getDatabase(app);
