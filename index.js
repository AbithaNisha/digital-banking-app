const express = require('express');
const path = require('node:path'); 
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'src', 'public')));

app.post('/transfer', (req, res) => {
    // SonarQube Fix: Optional chaining (?) and direct destructuring
    const receiverAccount = req.body?.receiverAccount;
    const amount = req.body?.amount;

    if (!receiverAccount?.startsWith('UBI')) {
        return res.status(400).json({ message: "Please enter a valid account number" });
    }

    if (!amount || amount <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
    }

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB'); 
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const transactionTime = `${formattedDate} ${formattedTime}`;
    
    return res.json({ 
        status: "Success", 
        time: transactionTime,
        transferAmount: amount 
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
