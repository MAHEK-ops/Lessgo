const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const tripRoutes = require('./routes/tripRoutes');
const { use } = require('react');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Lessgo backend running...")
})

app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});