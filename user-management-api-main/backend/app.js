const express = require('express'); 
const app = express(); // Create an Express application instance
app.use(express.json()); // Middleware to parse JSON request bodies

// In-memory array to store user data since we have no database here
const users = []; 
const errors = [];
/**
 * Helper validation functions
 */

// Validates that a name is a string with 3 to 50 characters
function validateName(name) {
    return typeof name === 'string' && name.length >= 3 && name.length <= 50;
}

// Validates that an email follows the standard format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validates that a password contains at least one uppercase letter, one special character, and is at least 8 characters long
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
}

/**
 * Routes for user management
 */

// Route to create a new user
app.post('/users', (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;
    
    // Validate first name and last name
    if (!validateName(firstName) || !validateName(lastName)) {
        return res.status(400).json({ error: 'First name and last name must be between 3 and 50 characters.' });
    }
    // Validate email format
    if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }
    // Validate password strength
    if (!validatePassword(password)) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long, contain one uppercase letter, and one special character.' });
    }
    
    // Create a new user object and add it to the users array
    const user = { id: users.length + 1, firstName, lastName, username, email, password };
    users.push(user);
    
    // Return the newly created user with status 201 (Created)
    res.status(201).json(user);
});

// Route to get all users
app.get('/users', (req, res) => {
    // If no users exist, return a message
    if (users.length === 0) {
        return res.status(200).json({ message: 'No users available' });
    }
    // Return the list of users
    res.json(users);
});

// Route to get a specific user by ID
app.get('/users/:id', (req, res) => {
    // Find the user with the matching ID
    const user = users.find(u => u.id === parseInt(req.params.id));
    
    // If user not found, return 404 error
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    // Return the user data
    res.json(user);
});

// Route to delete a user by ID
app.delete('/users/:id', (req, res) => {
    // Find the index of the user with the given ID
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    
    // If user not found, return 404 error
    if (index === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    // Remove the user from the array
    users.splice(index, 1);
    
    // Respond with 204 No Content (successful deletion)
    res.status(204).send();
});

// Exporting the app and helper functions for testing or reuse
module.exports = { app, users, validateName, validateEmail, validatePassword };

// If this file is run directly, start the Express server
if (require.main === module) {
    app.listen(3000, () => console.log('Server running on port 3000'));
}