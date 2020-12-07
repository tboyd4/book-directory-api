// server dependencies initiating
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// server variables
const app = express();
const port = process.env.PORT || 5000;

// middleware initiation
app.use(cors());
app.use(express.json());

// mongoDB connection
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB Connection Established Successfully.');
})

// setting up router
const bookRouter = require('./routes/books');
app.use('/books', bookRouter);

// initialize server
app.listen(port, () => {
    console.log(`Server Established. Listening on Port ${port}`);
})
