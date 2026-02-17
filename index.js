const express = require('express');
const path = require('path'); // Indha line dhaan file path-ai kandupidikka dhedhum
const app = express();
const PORT = 3000;

// 'src/public' folder-la irukura style.css, script.js maari files-ai load panna
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Browser-la localhost:3001 nu adikkumpodhu index.html-ai kaatta indha code venum
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
