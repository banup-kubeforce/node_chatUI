const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

async function callExternalAPI(question, history, stuffit = true) {
    try {
        const response = await axios.post('http://localhost:8080/fc', {
            question,
            stuffit,
            history
        });
        return response.data.answer;
    } catch (error) {
        console.error('Error calling external API:', error);
        return 'Sorry, I encountered an error while processing your request.';
    }
}

app.post('/ask', async (req, res) => {
    const { question, history } = req.body;
    if (!question) {
        return res.status(400).json({ error: 'Question is required' });
    }
    const answer = await callExternalAPI(question, history);
    res.json({ answer });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});