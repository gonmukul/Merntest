const express = require('express');
const mongoose = require('mongoose');
const productsRoute = require('./routes/products');

const app = express();
const PORT = 3000;
const MONGODB_URI = 'mongodb://localhost:27017/yourDatabaseName';

// Middleware
app.use(express.json());

// Routes
app.use('/products', productsRoute);

// Connect to MongoDB and start the server
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });

