// Conecta ao servidor WebSocket
const socket = io();

// Elementos da página
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Define um nome de usuário aleatório
const username = `User_${Math.floor(Math.random() * 1000)}`;

// Função para renderizar mensagens no chat
function renderMessage(user, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    const userIcon = document.createElement('div');
    userIcon.classList.add('user-icon');
    userIcon.innerText = user.charAt(0).toUpperCase();

    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.innerHTML = `<strong>${user}</strong><br>${message}`;

    messageElement.appendChild(userIcon);
    messageElement.appendChild(messageContent);

    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Enviar mensagem ao clicar no botão "Send"
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('send_message', { username, message });  // Envia mensagem ao servidor
        messageInput.value = '';  // Limpa o campo de input
    }
});

// Receber e renderizar mensagens enviadas pelo servidor
socket.on('receive_message', (data) => {
    renderMessage(data.username, data.message);
});
