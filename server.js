const WebSocket = require('ws');
const {handleRoomEvents} = require("./roomEvents");
const {removeMember} = require("./store");
const {handleGameEvents} = require("./gameEvents");
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
            if(handleGameEvents(socket, data)) {
                return;
            }
            socket.send(JSON.stringify({ type: "error", message: "Invalid message type" }));
        }
    });

    socket.on("close", () => {
        try {
            socket.send(JSON.stringify({ type: "disconnected", message: "Connection closed" }));
        } catch (e) {
            console.error(e);
        }
        removeMember(socket);
        console.log(`Socket ${socket._socket.remoteAddress} disconnected.`);
    });
});

