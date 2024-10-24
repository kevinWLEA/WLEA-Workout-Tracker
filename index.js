document.addEventListener('DOMContentLoaded', function () {
    const collapsibles = document.querySelectorAll('.collapsible');
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    // Set the date for each day of the week
    const today = new Date();
    const dayOfWeek = today.getDay();  // Sunday = 0, Monday = 1, etc.
    const weekDates = [];

    // Generate dates for the week starting from Monday
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() - dayOfWeek + i + 1); // +1 to start from Monday
        weekDates.push(currentDate.toLocaleDateString());
    }

    // Assign dates to corresponding day labels
    daysOfWeek.forEach((day, index) => {
        document.getElementById(`date-${day.toLowerCase()}`).textContent = `(${weekDates[index]})`;
    });

    collapsibles.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    });
});
