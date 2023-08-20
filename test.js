const express = require('express');
const asyncHandler = require('express-async-handler');

const app = express();

// Simulate fetching user data from a database (asynchronous operation)
async function fetchUserData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = { id: 1, name: 'John Doe' };
            // Simulate an error
            reject(new Error('Database error'));
            // resolve(user);
        }, 1000);
    });
}

// Using express-async-handler to handle asynchronous code
app.get('/user/:id', asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = await fetchUserData(userId);
    res.json(user);
}));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.json({ title: 'Server Error', message: err.message, stackTrace: err.stack });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});