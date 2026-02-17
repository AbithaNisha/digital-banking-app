const express = require('express');
// SonarQube Fix: 'path' ku bathila 'node:path' use panrom
const path = require('node:path'); 
const app = express();
const PORT = 3000;

// Middleware for JSON (Data anupumpodhu date logic-ku ithu thevai padum)
app.use(express.json());

// 'src/public' folder-la irukura files-ai load panna
app.use(express.static(path.join(__dirname, 'src', 'public')));

// --- DATE LOGIC FOR TRANSACTIONS ---
// Intha logic-ai unga transfer API-la use pannunga
app.post('/transfer', (req, res) => {
    const { receiverAccount, amount } = req.body;

    // 1. Neenga keta Error Message logic
    if (!receiverAccount.startsWith('UBI')) {
        return res.status(400).json({ message: "Please enter a valid account number" });
    }

    // 2. Neenga keta Date logic
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB'); // DD/MM/YYYY
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const transactionTime = `${formattedDate} ${formattedTime}`;

    console.log(`Transaction at: ${transactionTime}`);
    res.json({ status: "Success", time: transactionTime });
});

// Browser-la index.html-ai kaatta
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
