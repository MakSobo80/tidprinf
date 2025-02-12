const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

rooms = {};

wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        const data = JSON.parse(message);
        if (data.type === "create-room") {
            if (rooms[data.room]) {
                socket.send(JSON.stringify({ type: "error", message: "Room already exists" }));
                return;
            }
            rooms[data.room] = {members: [socket]};
            socket.send(JSON.stringify({ type: "room-created", room: data.room }));
        } else if (data.type === "join-room") {
            if (!rooms[data.roomName]) {
                socket.send(JSON.stringify({ type: "error", message: "Room does not exist" }));
                return;
            }
            rooms[data.room].push(socket);
            socket.send(JSON.stringify({ type: "room-joined", room: data.room }));
        }
    });

    socket.on("close", () => {
        socket.send();
    });
});