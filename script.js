// Import the necessary functions from Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc, setDoc, increment } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBgC7eK1-jwDwXqHfmHb3MjPNnBlcjQWr8",
    authDomain: "scraplink-9ce04.firebaseapp.com",
    projectId: "scraplink-9ce04",
    storageBucket: "scraplink-9ce04.appspot.com",
    messagingSenderId: "406914882192",
    appId: "1:406914882192:web:3d429db720b3821decd615",
    measurementId: "G-G9M68432JZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get the Firebase Auth instance
const db = getFirestore(app);

function logScrap() {
    const scrapType = document.getElementById('scrap-type').value;
    const scrapWeight = parseFloat(document.getElementById('scrap-weight').value);
    const scrapVolume = parseFloat(document.getElementById('scrap-volume').value);

    if (isNaN(scrapWeight) || isNaN(scrapVolume)) {
        alert("Please enter valid numbers for weight and volume.");
        return;
    }

    co2Saved += scrapWeight * 0.1; // Example CO₂ savings per kg
    resourcesConserved += scrapVolume * 0.05; // Example resources savings per liter

    document.getElementById('co2-saved').innerText = co2Saved.toFixed(2);
    document.getElementById('resources-conserved').innerText = resourcesConserved.toFixed(2);

    const progressPercent = Math.min((co2Saved / goal) * 100, 100);
    document.getElementById('progress-bar').style.width = progressPercent + '%';

    document.getElementById('scrap-type').value = '';
    document.getElementById('scrap-weight').value = '';
    document.getElementById('scrap-volume').value = '';

    alert(`Scrap logged: ${scrapType} - ${scrapWeight} kg, ${scrapVolume} liters`);
}
document.addEventListener("DOMContentLoaded", () => {
    // Handle login form submission
    const loginForm = document.getElementById('hospital-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent the default form submission

            const email = document.getElementById('hospital-email').value;
            const password = document.getElementById('hospital-password').value;

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log('Login successful:', user);
                document.getElementById('auth-message').innerText = 'Login successful! Welcome, ' + user.email;

                
                setTimeout(() => {
                    window.location.href = 'cop.html'; 
                }, 2000);
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error logging in:', errorCode, errorMessage);
                document.getElementById('auth-message').innerText = errorMessage;
            }
        });
    }})
  // Handle signup form submission
 // Handle signup form submission
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent the default form submission

        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        try {
            // Create user with Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('Signup successful:', user);

            // Create user document in Firestore
            await setDoc(doc(db, "users", user.uid), {
                rewards: 0 // Initialize rewards to 0
            });

            document.getElementById('auth-message').innerText = 'Signup successful! Welcome, ' + user.email;

            // Debug: Log to check if this part of the code is reached
            console.log('Redirecting to login page...');
            
            // Redirect to login page after successful signup
            setTimeout(() => {
                window.location.href = 'login.html'; // Redirect to login page
            }, 2000); // Optional: delay the redirection for 2 seconds for user experience

            signupForm.reset();
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error signing up:', errorCode, errorMessage);
            document.getElementById('auth-message').innerText = `Error: ${errorMessage}`;
        }
    });
}

onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log("User is logged in:", user.uid);
            
            await displayUserRewards(); // Display rewards on page load if user is logged in
        } else {
            console.log("No user is logged in.");
        }
    });
