let students = JSON.parse(localStorage.getItem('students')) || [];
let classes = JSON.parse(localStorage.getItem('classes')) || [];

// Function to create a new class
function createClass(className) {
    classes.push({ id: Date.now(), name: className });
    localStorage.setItem('classes', JSON.stringify(classes));
    displayClasses();
}

// Function to display classes in the dropdown
function displayClasses() {
    const classSelect = document.getElementById('class-select');
    classSelect.innerHTML = '<option value="" selected disabled>Select a class</option>';
    classes.forEach(cls => {
        const option = document.createElement('option');
        option.value = cls.name;
        option.textContent = cls.name;
        classSelect.appendChild(option);
    });
}
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

// Function to display students by class
function displayStudentsByClass(className) {
    const studentsTableBody = document.getElementById('students-table-body');
    studentsTableBody.innerHTML = ''; // Clear the table

    const filteredStudents = students.filter(student => student.className === className);

    filteredStudents.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.agencyName}</td>
            <td>${student.className}</td>
            <td>
                <button class="view-btn" data-id="${student.id}">View</button>
                <button class="edit-btn" data-id="${student.id}">Edit</button>
                <button class="delete-btn" data-id="${student.id}">Delete</button>
            </td>
        `;
        studentsTableBody.appendChild(row);
    });
}

// Handle class creation form submission
document.getElementById('class-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const className = document.getElementById('class-name').value;
    createClass(className);
    document.getElementById('class-form').reset();
});

// Handle class selection and display students
document.getElementById('class-select').addEventListener('change', function() {
    const selectedClass = this.value;
    displayStudentsByClass(selectedClass);
});

// Load classes when the page loads
document.addEventListener('DOMContentLoaded', function() {
    displayClasses();
    displayStudents();
});

// Redirect to create-student.html
document.getElementById('create-student-btn').addEventListener('click', function() {
    window.location.href = 'create-student.html';
});
