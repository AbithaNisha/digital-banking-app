const express = require('express');
const app = express();
const PORT = 3000;

// Serve frontend files
app.use(express.static('src/public'));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
