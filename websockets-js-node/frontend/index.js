   // frontend/script.js

   // Create a WebSocket connection to the server
   const socket = new WebSocket("ws://localhost:8080");

   // Display connection status
   socket.onopen = () => {
     console.log("Connected to the WebSocket server");
   };

   // Handle incoming messages from the server
   socket.onmessage = (event) => {
     const messageDiv = document.getElementById("messages");
     const newMessage = document.createElement("p");
     newMessage.textContent = event.data.toString();
     messageDiv.appendChild(newMessage);
   };

   // Handle connection closure
   socket.onclose = () => {
     console.log("Disconnected from the WebSocket server");
   };

   // Send a message to the server
   function sendMessage() {
     const usernameInput = document.getElementById("username");
     const messageInput = document.getElementById("messageInput");
     const message = messageInput.value;
     const username = usernameInput.value;
     if (message) {
       socket.send(`${username}: ${message}`);
       messageInput.value = "";
     }
   }

