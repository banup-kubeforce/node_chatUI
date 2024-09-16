const ChatService = () => {
    const SendMessage = async function(message) {
        try {
            const response = await fetch(`http://localhost:3000/fc?question=${encodeURIComponent(message)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return await response.json();
        } catch (e) {
            console.log(e);
            return e;
        }
    }

    return { SendMessage };
}

module.exports = ChatService;

