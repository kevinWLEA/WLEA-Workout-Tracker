let students = JSON.parse(localStorage.getItem('students')) || [];
let classes = JSON.parse(localStorage.getItem('classes')) || [];

// Function to create a new student
function createStudent(firstName, lastName, agencyName, className, username, password) {
    const newStudent = {
        id: Date.now(),
        firstName,
        lastName,
        agencyName,
        className,
        username,
        password,
        personalTime: 0,
        teamTime: 0
    };
    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));
}

// Populate class dropdown on the student creation page
function populateClassDropdown() {
    const classSelect = document.getElementById('class-name');
    classSelect.innerHTML = '<option value="" selected disabled>Select a class</option>';
    classes.forEach(cls => {
        const option = document.createElement('option');
        option.value = cls.name;
        option.textContent = cls.name;
        classSelect.appendChild(option);
    });
}

// Handle form submission
document.getElementById('student-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const agencyName = document.getElementById('agency-name').value;
    const className = document.getElementById('class-name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    createStudent(firstName, lastName, agencyName, className, username, password);

    document.getElementById('student-form').reset();
    alert('Student created successfully!');
});

// Load classes when the page loads
document.addEventListener('DOMContentLoaded', populateClassDropdown);

// Redirect back to the dashboard
document.getElementById('back-to-dashboard').addEventListener('click', function() {
    window.location.href = 'admin.html';
});
