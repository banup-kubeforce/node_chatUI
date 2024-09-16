const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 9090;

app.use(cors());
app.use(express.static('public'));

async function callExternalAPI(question) {
    try {
        const response = await axios.get(`http://localhost:8080/fc?question=${encodeURIComponent(question)}`);
        return response.data.answer;
    } catch (error) {
        console.error('Error calling external API:', error);
        return 'Sorry, I encountered an error while processing your request.';
    }
}

app.get('/ask', async (req, res) => {
    const question = req.query.question;
    if (!question) {
        return res.status(400).json({ error: 'Question is required' });
    }
    const answer = await callExternalAPI(question);
    res.json({ answer });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});