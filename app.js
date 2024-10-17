const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const comicRoutes = require('./routes/comicRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', comicRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
