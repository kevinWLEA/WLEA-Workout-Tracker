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
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

// Handle workout form submission
document.querySelectorAll('.workout-form').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        // Logic to save workout data here...

        // Show saved indicator
        const saveIndicator = this.querySelector('.save-indicator');
        saveIndicator.style.display = 'inline';
        setTimeout(() => {
            saveIndicator.style.display = 'none';
        }, 2000);
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
