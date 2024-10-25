// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

// Firebase configuration
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
document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    console.log("Login form submitted");

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Create a dummy email from the username
    const email = `${username}@dummy.com`;
    console.log("Generated email:", email);

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User signed in with UID:", user.uid);

        // Retrieve user role from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log("User role retrieved:", userData.role);

            // Check the role and redirect accordingly
            if (userData.role === "admin") {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'index.html';
            }
        } else {
            console.error("User document not found in Firestore.");
            document.getElementById('error-message').textContent = 'User data not found.';
        }
    } catch (error) {
        console.error("Login error:", error.message);
        document.getElementById('error-message').textContent = 'Error: ' + error.message;
    }
});

// Logout function
document.getElementById('logout-button')?.addEventListener('click', function() {
    signOut(auth).then(() => {
        console.log("User logged out");
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error('Error logging out:', error);
    });
});
