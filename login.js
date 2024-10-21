document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the values from the input fields
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulated user data (you'll replace this with database check later)
    const users = [
        { username: 'admin', password: 'admin123', role: 'admin' },
        { username: 'student1', password: 'student123', role: 'student', courseId: 2 },
        { username: 'student2', password: 'student123', role: 'student', courseId: 2},
    ];

    // Check if the user exists
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Redirect based on the user role
        if (user.role === 'admin') {
            window.location.href = 'admin.html'; // Redirect to the admin dashboard
        } else if (user.role === 'student') {
            window.location.href = 'index.html'; // Redirect to the student dashboard
        }
    } else {
        // Display an error message
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = 'Invalid username or password';
        errorMessage.style.display = 'block';
    }
});
