// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAsetUZT2W12nt8Fx0TJC4okuht1KXB-I0",
    authDomain: "wlea-workout-tracker-da7f4.firebaseapp.com",
    projectId: "wlea-workout-tracker-da7f4",
    storageBucket: "wlea-workout-tracker-da7f4.appspot.com",
    messagingSenderId: "129716869185",
    appId: "1:129716869185:web:bc5485ea1be43aa2b90ec0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Create a dummy email from the username
    const email = `${username}@dummy.com`; // Adjust this according to your structure

    // Sign in the user
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Optional: Fetch the user role from Firestore
            // Redirect based on role (admin or student)
            window.location.href = 'index.html'; // Adjust this according to the user's role
        })
        .catch((error) => {
            const errorMessage = error.message;
            document.getElementById('error-message').textContent = 'Error: ' + errorMessage;
        });
});

// Logout function
document.getElementById('logout-button').addEventListener('click', function() {
    signOut(auth).then(() => {
        // Redirect to login page after logging out
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error('Error logging out:', error);
    });
});
