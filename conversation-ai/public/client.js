function sendMessage() {
    const userInput = document.getElementById('userInput');
    const chatbox = document.getElementById('chatbox');
    const question = userInput.value.trim();

    if (question) {
        // Display user message
        chatbox.innerHTML += `<p><strong>You:</strong> ${question}</p>`;

        // Call the API
        fetch(`/ask?question=${encodeURIComponent(question)}`)
            .then(response => response.json())
            .then(data => {
                // Use marked library to render Markdown, including tables
                const renderedAnswer = marked(data.answer);
                chatbox.innerHTML += `<p><strong>AI:</strong> ${renderedAnswer}</p>`;
                chatbox.scrollTop = chatbox.scrollHeight;
            })
            .catch(error => {
                console.error('Error:', error);
                chatbox.innerHTML += '<p><strong>AI:</strong> Sorry, I encountered an error.</p>';
            });

        userInput.value = '';
    }
}

// Add event listener for Enter key
document.getElementById('userInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});