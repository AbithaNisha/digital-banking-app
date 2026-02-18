const express = require('express');
const path = require('node:path'); 
const app = express();
const PORT = process.env.PORT || 3000; // Hardcoded-ah illaama process port use panradhu best

app.use(express.json());
app.use(express.static(path.join(__dirname, 'src', 'public')));

app.post('/transfer', (req, res) => {
    const { receiverAccount, amount } = req.body;

    // Validation
    if (!receiverAccount || !receiverAccount.startsWith('UBI')) {
        return res.status(400).json({ message: "Please enter a valid account number" });
    }

    if (!amount || amount <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
    }

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB'); 
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const transactionTime = `${formattedDate} ${formattedTime}`;
    
    // SonarQube fix: console.log-ku pathila response-la anupunga
    res.json({ 
        status: "Success", 
        time: transactionTime,
        transferAmount: amount // amount-ai use panniyachu, so error varathu
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
