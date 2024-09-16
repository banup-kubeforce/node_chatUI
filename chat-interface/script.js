async function sendQuestion() {
    const questionInput = document.getElementById('question-input');
    const chatBox = document.getElementById('chat-box');

    const question = questionInput.value;
    if (!question) {
        return;
    }

    // Display the question in the chat box
    const questionMessage = document.createElement('div');
    questionMessage.classList.add('message');
    questionMessage.innerHTML = `<strong>You:</strong> ${question}`;
    chatBox.appendChild(questionMessage);

    // Clear the input field
    questionInput.value = '';

    // Send the question to the server
    try {
        const response = await fetch(`/fc?question=${encodeURIComponent(question)}`);
        const data = await response.json();

        // Display the answer in the chat box
        const answerMessage = document.createElement('div');
        answerMessage.classList.add('message');
        answerMessage.innerHTML = `<strong>Bot:</strong> ${data.answer}`;
        chatBox.appendChild(answerMessage);

        // Scroll to the bottom of the chat box
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error('Error:', error);
    }
}
;

