const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Static files (CSS, Images) load aaga
app.use(express.static(path.join(__dirname, 'public')));

// 1. Home Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// 2. Login Page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

// 3. Dashboard (Transaction Page)
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/dashboard.html'));
});

app.listen(PORT, () => {
    console.log(`UBI Bank App running at http://localhost:${PORT}`);
});