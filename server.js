const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

rooms = {};

wss.on("connection", (socket) => {
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
        socket.send();
    });
});

const handleRoomEvents = (socket, data) => {
    if (data.type === "create-room") {
        for (const room in rooms) {
            if (room.includes(socket)) {
                socket.send(JSON.stringify({ type: "error", message: "You are already in a room, leave it to join another one" }));
                console.log(`Socket ${socket._socket.remoteAddress} tried to create a room, but is already in a room.`);
                return;
            }
        }


        let room = Math.floor(Math.random() * 900000) + 100000;
        while (!rooms[room]) {
            room = Math.floor(Math.random() * 900000) + 100000
        }

        rooms[room] = {members: [socket]};
        socket.send(JSON.stringify({ type: "room-created", room: room }));
        console.log(`Socket ${socket._socket.remoteAddress} created room ${room}.`);
    } else if (data.type === "join-room") {
        for (const room in rooms) {
            if (room.includes(socket)) {
                socket.send(JSON.stringify({ type: "error", message: "You are already in a room, leave it to join another one" }));
                console.log(`Socket ${socket._socket.remoteAddress} tried to join a room, but is already in a room.`);
                return;
            }
        }

        if (!rooms[data.room]) {
            socket.send(JSON.stringify({ type: "error", message: "Room does not exist" }));
            console.log(`Socket ${socket._socket.remoteAddress} tried to join room ${data.room}, but it does not exist.`);
            return;
        }
        rooms[data.room].push(socket);
        socket.send(JSON.stringify({ type: "room-joined", room: data.room }));
        console.log(`Socket ${socket._socket.remoteAddress} joined room ${data.room}.`);
    } else if (data.type === "leave-room") {
        let inARoom = false;
        let room = "";
        rooms.forEach((v, i) => {
            if (v.members.includes(socket)) {
                inARoom = true;
                room = rooms.keys()[i];
            }
        });

        if (!inARoom) {
            socket.send(JSON.stringify({ type: "error", message: "You are not in a room" }));
            console.log(`Socket ${socket._socket.remoteAddress} tried to leave a room, but is not in a room.`);
            return;
        }

        if (!rooms[room]) {
            socket.send(JSON.stringify({ type: "error", message: "Room does not exist" }));
            console.log(`Socket ${socket._socket.remoteAddress} tried to leave room ${room}, but it does not exist.`);
            return;
        }
        rooms[room].members = rooms[room].members.filter((member) => member !== socket);
        socket.send(JSON.stringify({ type: "room-left", room: room }));
        console.log(`Socket ${socket._socket.remoteAddress} left room ${room}.`);

        if(rooms[room].members.length <= 0) {
            delete rooms[room];
            console.log(`Room ${room} was deleted because it had no members.`);
        }
    } else if (data.type === "delete-room") {
        let inARoom = false;
        let room = "";
        rooms.forEach((v, i) => {
            if (v.members.includes(socket)) {
                inARoom = true;
                room = rooms.keys()[i];
            }
        });

        if (!inARoom) {
            socket.send(JSON.stringify({ type: "error", message: "You are not in a room" }));
            console.log(`Socket ${socket._socket.remoteAddress} tried to delete a room, but is not in a room.`);
            return;
        }

        if (!rooms[room]) {
            socket.send(JSON.stringify({ type: "error", message: "Room does not exist" }));
            console.log(`Socket ${socket._socket.remoteAddress} tried to delete room ${room}, but it does not exist.`);
            return;
        }

        if (rooms[room].members[0] !== socket) {
            socket.send(JSON.stringify({ type: "error", message: "Only the room creator can delete the room" }));
            console.log(`Socket ${socket._socket.remoteAddress} tried to delete room ${room}, but it is not the creator.`);
            return;
        }

        rooms[room].members.forEach((member) => {
            member.send(JSON.stringify({ type: "room-deleted", room: room }));
        });
        delete rooms[room];
        console.log(`Socket ${socket._socket.remoteAddress} deleted room ${room}.`);
    }
}