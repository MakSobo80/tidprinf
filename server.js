const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

rooms = {};

wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        const data = JSON.parse(message);
        if (data.type.includes("room")) {
            handleRoomEvents(socket, data);
        } else {
            socket.send(JSON.stringify({ type: "error", message: "Invalid message type" }));
        }
    });

    socket.on("close", () => {
        socket.send();
    });
});

const handleRoomEvents = (socket, data) => {
    if (data.type === "create-room") {
        if (rooms[data.room]) {
            socket.send(JSON.stringify({ type: "error", message: "Room already exists" }));
            console.log(`Socket ${socket.remoteAddress} tried to create room ${data.room}, but it already exists.`);
            return;
        }
        rooms[data.room] = {members: [socket]};
        socket.send(JSON.stringify({ type: "room-created", room: data.room }));
        console.log(`Socket ${socket.remoteAddress} created room ${data.room}.`);
    } else if (data.type === "join-room") {
        if (!rooms[data.roomName]) {
            socket.send(JSON.stringify({ type: "error", message: "Room does not exist" }));
            console.log(`Socket ${socket.remoteAddress} tried to join room ${data.room}, but it does not exist.`);
            return;
        }
        rooms[data.room].push(socket);
        socket.send(JSON.stringify({ type: "room-joined", room: data.room }));
        console.log(`Socket ${socket.remoteAddress} joined room ${data.room}.`);
    } else if (data.type === "leave-room") {
        if (!rooms[data.roomName]) {
            socket.send(JSON.stringify({ type: "error", message: "Room does not exist" }));
            console.log(`Socket ${socket.remoteAddress} tried to leave room ${data.room}, but it does not exist.`);
            return;
        }
        rooms[data.room].members = rooms[data.room].members.filter((member) => member !== socket);
        socket.send(JSON.stringify({ type: "room-left", room: data.room }));
        console.log(`Socket ${socket.remoteAddress} left room ${data.room}.`);

        if(rooms[data.room].members.length <= 0) {
            delete rooms[data.room];
        }
    } else if (data.type === "delete-room") {
        if (!rooms[data.roomName]) {
            socket.send(JSON.stringify({ type: "error", message: "Room does not exist" }));
            console.log(`Socket ${socket.remoteAddress} tried to delete room ${data.room}, but it does not exist.`);
            return;
        }

        if (rooms[data.room].members[0] !== socket) {
            socket.send(JSON.stringify({ type: "error", message: "Only the room creator can delete the room" }));
            console.log(`Socket ${socket.remoteAddress} tried to delete room ${data.room}, but it is not the creator.`);
            return;
        }

        rooms[data.room].members.forEach((member) => {
            member.send(JSON.stringify({ type: "room-deleted", room: data.room }));
        });
        delete rooms[data.room];
        console.log(`Socket ${socket.remoteAddress} deleted room ${data.room}.`);
    }
}