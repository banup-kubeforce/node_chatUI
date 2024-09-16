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
        const response = await axios.post('http://localhost:8080/qareact', {
            question,
            stuffit,
            history
        });
        return parseReactResponse(response.data.answer);
    } catch (error) {
        console.error('Error calling external API:', error);
        return {
            thoughts: ['Error occurred'],
            actions: [],
            observations: [],
            conclusion: 'Sorry, I encountered an error while processing your request.'
        };
    }
}

function parseReactResponse(response) {
    const lines = response.split('\n');
    let result = {
        thoughts: [],
        actions: [],
        observations: [],
        conclusion: ''
    };
    let currentStep = '';

    for (const line of lines) {
        if (line.startsWith('Thought')) {
            currentStep = 'thought';
            result.thoughts.push(line);
        } else if (line.startsWith('Action')) {
            currentStep = 'action';
            result.actions.push(line);
        } else if (line.startsWith('Observation')) {
            currentStep = 'observation';
            result.observations.push(line);
        } else if (line.startsWith('Conclusion:')) {
            result.conclusion = line.replace('Conclusion:', '').trim();
        } else if (line.trim() !== '') {
            // Append to the last item of the current step
            switch (currentStep) {
                case 'thought':
                    result.thoughts[result.thoughts.length - 1] += ' ' + line.trim();
                    break;
                case 'action':
                    result.actions[result.actions.length - 1] += ' ' + line.trim();
                    break;
                case 'observation':
                    result.observations[result.observations.length - 1] += ' ' + line.trim();
                    break;
            }
        }
    }

    return result;
}

app.post('/ask', async (req, res) => {
    const { question, history } = req.body;
    if (!question) {
        return res.status(400).json({ error: 'Question is required' });
    }
    const response = await callExternalAPI(question, history);
    res.json(response);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});