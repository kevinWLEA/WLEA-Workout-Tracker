// Initialize Firebase
const auth = firebase.auth();

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Create a dummy email from the username
    const email = `${username}@dummy.com`; // Adjust if you have a different email structure

    // Sign in the user
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Redirect to the appropriate page based on user role
            const user = userCredential.user;
            // You may want to fetch user role from Firestore to determine redirection
            // Example: if the role is 'admin', redirect to admin dashboard
            // Otherwise, redirect to user dashboard
            window.location.href = 'index.html'; // Change this based on the user's role
        })
        .catch((error) => {
            const errorMessage = error.message;
            document.getElementById('error-message').textContent = 'Error: ' + errorMessage;
        });
});

// Logout function (for pages where the user is already logged in)
document.getElementById('logout-button')?.addEventListener('click', function() {
    auth.signOut().then(() => {
        // Redirect to the login page after logging out
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error('Error logging out:', error);
    });
});
