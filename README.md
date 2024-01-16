# Real-Time Chat Application

## Description

This is a real-time chat application built using Node.js, Express, and Socket.io. It allows users to join different chat rooms and exchange messages in real-time. The application also provides a RESTful API for retrieving chat messages based on various filters.

### Technologies Used
- **Node.js**: A JavaScript runtime for server-side development.
- **Express**: A web application framework for Node.js.
- **Socket.io**: A library for real-time web applications, enabling bi-directional communication between clients and servers.
- **HTML/CSS/JavaScript**: Front-end components for the chat application.
- **REST API**: Endpoints for retrieving chat messages based on user, room, and content filters.

## REST API Endpoints

1. **Get All Messages**
   - **URL:** `/api/messages`
   - **Method:** GET
   - **Functionality:** Retrieve all chat messages.

2. **Get Messages by User**
   - **URL:** `/api/messages/user/:username`
   - **Method:** GET
   - **Functionality:** Retrieve chat messages for a specific user.

3. **Get Messages by Room**
   - **URL:** `/api/messages/room/:room`
   - **Method:** GET
   - **Functionality:** Retrieve chat messages for a specific room.

4. **Get Messages Containing Word**
   - **URL:** `/api/messages/contains/:word`
   - **Method:** GET
   - **Functionality:** Retrieve chat messages containing a specific word.

## WebSocket Communication

WebSocket is used for real-time communication between the server and clients. Users can join a chat room and send/receive messages seamlessly. Here's how it works:

- The server establishes a WebSocket connection using Socket.io.
- Users emit a 'join' event when entering a chat room, and the server broadcasts a 'message' event to notify others about the new user.
- Users emit 'message' events to send chat messages, and the server broadcasts these messages to all users in the same room.
- The front-end uses Socket.io to handle events, updating the chat interface in real-time.

## How to Run

1. Open cmd in the repository folder
2. Innitialize npm: `npm init -y`
3. Install dependencies: `npm install express`
                         `npm install express socket.io`
4. Start the server: `node app.js`
5. Open a web browser and navigate to `http://localhost:3000`
