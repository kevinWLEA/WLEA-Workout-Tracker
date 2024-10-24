// Initialize Firebase (using your existing configuration)
const firebaseConfig = {
    apiKey: "AIzaSyAsetUZT2W12nt8Fx0TJC4okuht1KXB-I0",
    authDomain: "wlea-workout-tracker-da7f4.firebaseapp.com",
    projectId: "wlea-workout-tracker-da7f4",
    storageBucket: "wlea-workout-tracker-da7f4.appspot.com",
    messagingSenderId: "129716869185",
    appId: "1:129716869185:web:bc5485ea1be43aa2b90ec0"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Handle form submission for creating a new user
document.getElementById('create-user-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const role = document.getElementById('role').value;
    const classID = document.getElementById('class-id').value;
    const agencyName = document.getElementById('agency-name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Create a dummy email from the username
    const email = `${username}@dummy.com`; // Adjust this if you have a different email structure
    
    // Create a new user in Firebase Authentication
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            
            // Save additional user details in Firestore
            return db.collection('users').doc(user.uid).set({
                firstName: firstName,
                lastName: lastName,
                role: role,
                classID: classID,
                agencyName: agencyName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        })
        .then(() => {
            // Show success message
            document.getElementById('success-message').textContent = 'User account created successfully!';
        })
        .catch((error) => {
            console.error('Error creating user:', error);
            document.getElementById('success-message').textContent = `Error: ${error.message}`;
        });
});

// Logout function
document.getElementById('logout-button').addEventListener('click', function() {
    auth.signOut().then(() => {
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error('Error logging out:', error);
    });
});
