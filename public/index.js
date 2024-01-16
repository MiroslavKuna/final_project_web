document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const loginContainer = document.getElementById('login-container');
    const chatContainer = document.getElementById('chat-container');
    const usernameInput = document.getElementById('username-input');
    const roomInput = document.getElementById('room-input');
    const messageInput = document.getElementById('message-input');
    const joinButton = document.getElementById('join-button');
    const sendButton = document.getElementById('send-button');
    const messagesContainer = document.getElementById('messages');

    joinButton.addEventListener('click', () => {
      const username = usernameInput.value.trim();
      const room = roomInput.value.trim();

      if (username && room) {
        loginContainer.style.display = 'none';
        chatContainer.style.display = 'block';

        socket.emit('join', { username, room });

        fetch(`/api/messages/room/${room}`)
          .then(response => response.json())
          .then(messages => {
            messages.forEach(({ username, message, timestamp }) => {
              const formattedTimestamp = new Date(timestamp).toLocaleTimeString();
              const existingMessage = document.createElement('div');
              existingMessage.innerHTML = `<strong>${username}</strong> (${formattedTimestamp}): ${message}`;
              messagesContainer.appendChild(existingMessage);
            });
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
          });
      }
    });

    sendButton.addEventListener('click', () => {
      const message = messageInput.value.trim();
      const username = usernameInput.value.trim();
      const room = roomInput.value.trim();

      if (message && username && room) {
        socket.emit('message', { username, message, room });
        messageInput.value = '';
      }
    });

    socket.on('message', ({ username, message, room, timestamp }) => {
      const formattedTimestamp = new Date(timestamp).toLocaleTimeString();
      const newMessage = document.createElement('div');
      newMessage.innerHTML = `<strong>${username}</strong> (${formattedTimestamp}): ${message}`;
      messagesContainer.appendChild(newMessage);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });
  });