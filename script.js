let username;
let color;

function joinChat() {
    username = document.getElementById('username').value;
    color = document.getElementById('color').value;
    if (username) {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('chatContainer').style.display = 'block';
        loadMessages();
    } else {
        alert('Please enter your name.');
    }
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;
    if (message) {
        const formattedMessage = `<strong style="color: ${color};">${username}</strong>: ${message}`;
        saveMessage(formattedMessage);
        displayMessage(formattedMessage);
        messageInput.value = '';
    }
}

function saveMessage(message) {
    let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.push(message);
    localStorage.setItem('chatMessages', JSON.stringify(messages));
}

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = '';
    messages.forEach(message => {
        displayMessage(message);
    });
}

function displayMessage(message) {
    const messagesContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Listen for storage changes to update messages in real time
window.addEventListener('storage', function(event) {
    if (event.key === 'chatMessages') {
        loadMessages();
    }
});
