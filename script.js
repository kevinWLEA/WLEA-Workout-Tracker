// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAsetUZT2W12nt8Fx0TJC4okuht1KXB-I0",
    authDomain: "wlea-workout-tracker-da7f4.firebaseapp.com",
    projectId: "wlea-workout-tracker-da7f4",
    storageBucket: "wlea-workout-tracker-da7f4.appspot.com",
    messagingSenderId: "129716869185",
    appId: "1:129716869185:web:bc5485ea1be43aa2b90ec0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Logout function
document.getElementById('logout-button').addEventListener('click', function() {
    signOut(auth).then(() => {
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error('Error logging out:', error);
    });
});

// Get today's date and display it next to each day
const dateElements = document.querySelectorAll('.date');
dateElements.forEach(dateElement => {
    dateElement.textContent = `(${new Date().toLocaleDateString()})`;
});

// Collapsible functionality
const collapsibles = document.getElementsByClassName("collapsible");
for (let i = 0; i < collapsibles.length; i++) {
    collapsibles[i].addEventListener("click", function() {
        this.classList.toggle("active");
        const content = this.nextElementSibling;
        content.style.display = content.style.display === "block" ? "none" : "block";
    });
}

// Handle workout form submission
document.querySelectorAll('.workout-form').forEach(form => {
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const workoutType = form.querySelector('.workout-type').value;
        let workoutData = { date: new Date().toISOString() };

        // Collect data based on workout type
        if (workoutType === 'weight') {
            workoutData = {
                ...workoutData,
                exercise: form.querySelector('input[placeholder="Exercise"]').value,
                sets: parseInt(form.querySelector('input[placeholder="Sets"]').value),
                reps: parseInt(form.querySelector('input[placeholder="Reps"]').value),
                weight: parseFloat(form.querySelector('input[placeholder="Weight"]').value),
            };
        } else if (workoutType === 'cardio') {
            workoutData = {
                ...workoutData,
                time: parseInt(form.querySelector('input[placeholder="Time (minutes)"]').value),
                distance: parseFloat(form.querySelector('input[placeholder="Distance (miles)"]').value),
            };
        }

        // Save workout data to Firestore
        try {
            await addDoc(collection(db, "workouts"), workoutData);
            const saveIndicator = form.querySelector('.save-indicator');
            saveIndicator.style.display = 'inline';
            setTimeout(() => {
                saveIndicator.style.display = 'none';
            }, 2000);
        } catch (error) {
            console.error("Error saving workout data:", error);
        }
    });
});

// Handle add exercise button
document.querySelectorAll('.add-exercise-button').forEach(button => {
    button.addEventListener('click', function() {
        const form = this.closest('form');
        const workoutType = form.querySelector('.workout-type').value;

        if (workoutType === 'weight') {
            const weightTrainingInputs = `
                <input type="text" placeholder="Exercise" required>
                <input type="number" placeholder="Sets" required>
                <input type="number" placeholder="Reps" required>
                <input type="number" placeholder="Weight" required>
            `;
            form.insertAdjacentHTML('beforeend', weightTrainingInputs);
        } else if (workoutType === 'cardio') {
            const cardioInputs = `
                <input type="number" placeholder="Time (minutes)" required>
                <input type="number" placeholder="Distance (miles)" required>
            `;
            form.insertAdjacentHTML('beforeend', cardioInputs);
        }
    });

    // Change workout type visibility
    const workoutTypeSelect = document.querySelectorAll('.workout-type');
    workoutTypeSelect.forEach(select => {
        select.addEventListener('change', function() {
            const weightDiv = this.closest('.content').querySelector('.weight-training');
            const cardioDiv = this.closest('.content').querySelector('.cardio-training');
            if (this.value === 'weight') {
                weightDiv.style.display = 'block';
                cardioDiv.style.display = 'none';
            } else {
                weightDiv.style.display = 'none';
                cardioDiv.style.display = 'block';
            }
        });
    });
});
