// Define courses at the top of your script.js
const courses = [
    {
        id: 1,
        name: "Peace Officer Basic",
        duration: 9 // weeks
    },
    {
        id: 2,
        name: "Detention Officer Basic",
        duration: 5 // weeks
    }
];

// Logout function
function logout() {
    // Clear the session storage
    sessionStorage.removeItem('user'); // Remove user data
    window.location.href = 'login.html'; // Redirect to login page
}

// Attach the logout function to the logout button (if exists)
const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', logout);
}

// Function to display the dates for the entire week
function displayWeekDates() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
    
    // Calculate the start of the week (Monday)
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const mondayDate = new Date(today);
    mondayDate.setDate(today.getDate() + mondayOffset);

    // Format the date as "Month Day, Year"
    const options = { month: 'long', day: 'numeric', year: 'numeric' };

    // Set date for each day of the week
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    days.forEach((day, index) => {
        const currentDay = new Date(mondayDate);
        currentDay.setDate(mondayDate.getDate() + index); // Add index to find the correct day
        const dateElement = document.getElementById(`${day.toLowerCase()}-date`);
        if (dateElement) {
            dateElement.textContent = currentDay.toLocaleDateString('en-US', options);
        } else {
            console.error(`Element for ${day} not found!`);
        }
    });
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Display the week dates in the calendar
    displayWeekDates();
    
    // Add event listeners for collapsible sections
    document.querySelectorAll('.day-header').forEach(header => {
        header.addEventListener('click', function() {
            const content = header.nextElementSibling; // Get the next sibling (day content)
            if (content.style.display === 'none' || content.style.display === '') {
                content.style.display = 'block'; // Show content
            } else {
                content.style.display = 'none'; // Hide content
            }
        });
    });

    // Mock profile data (eventually, we'll pull this from a database)
    const studentProfile = {
        firstName: 'John',
        lastName: 'Doe',
        agencyName: 'City Police Dept',
        className: 'Peace Officer Basic',
        initialPtTest: {
            situps: 45,
            pushups: 30,
            runTime: '12:45',
            weight: '180 lbs'
        },
        midPtTest: {
            situps: 50,
            pushups: 35,
            runTime: '12:30'
        },
        finalPtTest: {
            situps: 55,
            pushups: 40,
            runTime: '12:15'
        }
    };

    // Populate profile data
    document.getElementById('first-name').textContent = studentProfile.firstName;
    document.getElementById('last-name').textContent = studentProfile.lastName;
    document.getElementById('agency-name').textContent = studentProfile.agencyName;
    document.getElementById('class-name').textContent = studentProfile.className;

    // Populate Initial PT Test data
    document.getElementById('initial-situps').textContent = studentProfile.initialPtTest.situps;
    document.getElementById('initial-pushups').textContent = studentProfile.initialPtTest.pushups;
    document.getElementById('initial-run-time').textContent = studentProfile.initialPtTest.runTime;
    document.getElementById('initial-weight').textContent = studentProfile.initialPtTest.weight;

    // Populate Mid PT Test data
    document.getElementById('mid-situps').textContent = studentProfile.midPtTest.situps;
    document.getElementById('mid-pushups').textContent = studentProfile.midPtTest.pushups;
    document.getElementById('mid-run-time').textContent = studentProfile.midPtTest.runTime;

    // Populate Final PT Test data
    document.getElementById('final-situps').textContent = studentProfile.finalPtTest.situps;
    document.getElementById('final-pushups').textContent = studentProfile.finalPtTest.pushups;
    document.getElementById('final-run-time').textContent = studentProfile.finalPtTest.runTime;

    // Tab switching logic
    const tabs = document.querySelectorAll('.tab-btn');
    const assessmentContents = document.querySelectorAll('.assessment-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.dataset.assessment;
            tabs.forEach(t => t.classList.remove('active')); // Remove active class from all tabs
            this.classList.add('active'); // Add active class to clicked tab
    
            assessmentContents.forEach(content => {
                content.style.display = content.id === target ? 'block' : 'none'; // Show/Hide content based on tab
            });
        });
    });
});

// Function to add a new row for weight training exercises
function addExerciseRow(day) {
    const tbody = document.getElementById(`${day.toLowerCase()}-body`);
    
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" class="exercise-name" placeholder="Exercise Name" required></td>
        <td><input type="text" class="sets-reps" placeholder="Sets x Reps" required></td>
        <td><input type="number" class="weight" placeholder="Weight (lbs)" required></td>
    `;
    tbody.appendChild(row);
}

// Function to add a new row for cardio exercises
function addCardioRow(day) {
    const tbody = document.getElementById(`${day.toLowerCase()}-cardio-body`);
    
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" class="cardio-type" placeholder="Cardio Type" required></td>
        <td><input type="number" class="cardio-distance" placeholder="Distance (miles)" required></td>
        <td><input type="number" class="cardio-time" placeholder="Time (minutes)" required></td>
    `;
    tbody.appendChild(row);
}

// Function to collect workouts for the entire week
function collectWorkouts() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const weeklyWorkouts = {};
    let personalWorkoutTime = 0; // In minutes
    let teamWorkoutTime = 0;     // In minutes

    days.forEach(day => {
        const weightTraining = [];
        const cardioTraining = [];

        // Collect weight training data
        const weightRows = document.getElementById(`${day.toLowerCase()}-body`).querySelectorAll('tr');
        weightRows.forEach(row => {
            const exercise = row.querySelector('.exercise-name').value;
            const setsReps = row.querySelector('.sets-reps').value;
            const weight = row.querySelector('.weight').value;

            weightTraining.push({ exercise, setsReps, weight });
        });

        // Collect cardio training data
        const cardioRows = document.getElementById(`${day.toLowerCase()}-cardio-body`).querySelectorAll('tr');
        cardioRows.forEach(row => {
            const cardioType = row.querySelector('.cardio-type').value;
            const distance = row.querySelector('.cardio-distance').value;
            const time = row.querySelector('.cardio-time').value;

            cardioTraining.push({ cardioType, distance, time });
        });

        // Get the workout type (personal/team) and duration for the day
        const workoutType = document.querySelector(`input[name="${day.toLowerCase()}-workout-type"]:checked`).value;
        const duration = parseInt(document.getElementById(`${day.toLowerCase()}-duration`).value, 10) || 0;

        if (workoutType === 'personal') {
            personalWorkoutTime += duration; // Add personal workout time
        } else if (workoutType === 'team') {
            teamWorkoutTime += duration;     // Add team workout time
        }

        // Store workouts by day
        weeklyWorkouts[day] = {
            weightTraining,
            cardioTraining,
            workoutType,
            duration
        };
    });

    // Update the workout time display
    updateWorkoutTimeDisplay(personalWorkoutTime, teamWorkoutTime);

    // Get the notes entered for the week
    const weeklyNotes = document.getElementById('notes').value;

    // Add the notes to the weekly workouts object
    weeklyWorkouts.notes = weeklyNotes;

    console.log('Collected Workouts for the Week:', weeklyWorkouts);
    alert('Workouts and notes for the week have been submitted!');
}

// Function to update the workout time display in hours
function updateWorkoutTimeDisplay(personalMinutes, teamMinutes) {
    const personalHours = (personalMinutes / 60).toFixed(2); // Convert minutes to hours
    const teamHours = (teamMinutes / 60).toFixed(2);         // Convert minutes to hours

    document.getElementById('personal-time').textContent = `${personalHours} hours`;
    document.getElementById('team-time').textContent = `${teamHours} hours`;
}

// Add row event listeners for weight training and cardio
document.querySelectorAll('.add-row').forEach(button => {
    button.addEventListener('click', function() {
        const day = button.getAttribute('data-day');
        addExerciseRow(day);
    });
});

document.querySelectorAll('.add-cardio-row').forEach(button => {
    button.addEventListener('click', function() {
        const day = button.getAttribute('data-day');
        addCardioRow(day);
    });
});

// Submit all workouts event listener
document.getElementById('submit-all-workouts').addEventListener('click', collectWorkouts);
