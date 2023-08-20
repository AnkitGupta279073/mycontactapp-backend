require('dotenv').config();
const connectDB = require('./db/connection');
const express = require('express');
const app = express();


const PORT = process.env.PORT || 5002;
const errorHandler = require('./middleware/errorHandler');


app.use(express.json());

app.use('/api/contact',require('./router/contactRouter'));
app.use('/api/users',require('./router/userRouter'));

app.use(errorHandler);


const start = async () => {
    try {
        connectDB();
        app.listen(PORT, () => {
            console.log(`server is running on ${PORT}`);
        });
    } catch (error) {
        console.log('Error', error);
    }
}

start();