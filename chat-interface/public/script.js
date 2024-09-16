function sendQuestion() {
    const questionInput = document.getElementById('question-input');
    const chatBox = document.getElementById('chat-box');
    
    const userMessage = questionInput.value.trim();
    
    if (userMessage === '') {
        return;
    }

    appendMessage(userMessage, 'user');
    
    // URL encode the user's question
    const encodedQuestion = encodeURIComponent(userMessage);
    
    // Construct the URL with the user's question
    const url = `/qa?question=${encodedQuestion}`;
    
    // Fetch the response from the server
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const botResponse = data.answer; // Assuming the server returns a JSON object with an 'answer' field
            appendMessage(botResponse, 'bot');
        })
        .catch(error => {
            console.error('Error:', error);
            appendMessage('Sorry, something went wrong. Please try again.', 'bot');
        });

    questionInput.value = '';
}

function appendMessage(text, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = text;
    
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}


