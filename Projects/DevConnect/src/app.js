const express = require('express');
const app = express();

app.use(express.json());

// Routes
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/posts', postRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('DevConnect API Running');
});

module.exports = app;