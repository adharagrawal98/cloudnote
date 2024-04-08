const connectToMongo = require('./db');
const express = require('express');
const authRouter = require('./routes/auth');
const notesRouter = require('./routes/notes');
const cors = require('cors');
const port = 8000;
const bodyParser = require('body-parser');

const app = express();
// Connect to MongoDB
connectToMongo();
app.use(cors());
app.use(express.json());
// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
// Define route handlers
app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);

// Define a route handler for the root path
app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});





