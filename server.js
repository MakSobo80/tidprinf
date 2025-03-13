const WebSocket = require('ws');
const {handleRoomEvents} = require("./roomEvents");
const {removeMember} = require("./store");
const wss = new WebSocket.Server({ port: 8080 });
console.log("Server started on port 8080");

wss.on("connection", (socket) => {
    socket.send(JSON.stringify({ type: "connected" }));
    console.log(`Socket ${socket._socket.remoteAddress} connected.`);
    socket.on("message", (message) => {
        const data = JSON.parse(message);
        if (data.type.includes("room")) {
            handleRoomEvents(socket, data);
        } else {
            socket.send(JSON.stringify({ type: "error", message: "Invalid message type" }));
        }
    });

    socket.on("close", () => {
        socket.send({ type: "disconnected", message: "Connection closed" });
        removeMember(socket);
        console.log(`Socket ${socket._socket.remoteAddress} disconnected.`);
    });
});

