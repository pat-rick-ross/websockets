   // backend/server.js

   const http = require("http");
   const { WebSocketServer } = require("ws");

   // Create a simple HTTP server
   const server = http.createServer((req, res) => {
     res.writeHead(200, { "Content-Type": "text/plain" });
     res.end("WebSocket server is running.\n");
   });

   // Create a WebSocket server using the HTTP server
   const wss = new WebSocketServer({ server });

   wss.on("connection", (ws) => {
     console.log("New client connected");

     // Send a welcome message to the newly connected client
     ws.send("Server: Welcome to the WebSocket server!");

     // Listen for messages from the client
     ws.on("message", (message) => {
       // Broadcast the received message to all connected clients
       wss.clients.forEach((client) => {
         if (client.readyState === ws.OPEN) {
           client.send(message.toString());
         }
       });
     });

     // Handle client disconnection
     ws.on("close", () => {
       console.log("Client disconnected");
     });
   });

   // Start the HTTP and WebSocket server on port 8080
   server.listen(8080, () => {
     console.log("Server is running on http://localhost:8080");
   });
