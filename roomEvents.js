const { addMember, createRoom, getRoom, getRoomCode, isCreator, removeMember, removeRoom } = require("./store.js");

const handleRoomEvents = (socket, data) => {
    if (data.type === "create-room") {
        if(getRoomCode(socket)) {
            socket.send(JSON.stringify({ type: "error", message: "You are already in a room, leave it to join another one" }));
            console.log(`Socket ${socket._socket.remoteAddress} tried to create a room, but is already in a room.`);
            return;
        }

        let code = "" + Math.floor(Math.random() * 900000) + 100000;
        while (getRoom(code)) {
            code = "" + Math.floor(Math.random() * 900000) + 100000;
        }

        createRoom(code, socket);
        socket.send(JSON.stringify({ type: "room-created", room: code }));
        console.log(`Socket ${socket._socket.remoteAddress} created room ${code}.`);
    } else if (data.type === "join-room") {
        if (getRoomCode(socket)) {
            socket.send(JSON.stringify({ type: "error", message: "You are already in a room, leave it to join another one" }));
            console.log(`Socket ${socket._socket.remoteAddress} tried to join a room, but is already in a room.`);
            return;
        }

        if (!getRoom(data.room)) {
            socket.send(JSON.stringify({ type: "error", message: "Room does not exist" }));
            console.log(`Socket ${socket._socket.remoteAddress} tried to join room ${data.room}, but it does not exist.`);
            return;
        }

        addMember(data.room, socket);
        socket.send(JSON.stringify({ type: "room-joined", room: data.room }));
        console.log(`Socket ${socket._socket.remoteAddress} joined room ${data.room}.`);
    } else if (data.type === "leave-room") {
        const room = getRoomCode(socket);
        if (!room) {
            socket.send(JSON.stringify({ type: "error", message: "You are not in a room" }));
            console.log(`Socket ${socket._socket.remoteAddress} tried to leave a room, but is not in a room.`);
            return;
        }

        removeMember(room, socket);
        socket.send(JSON.stringify({ type: "room-left" }));
        console.log(`Socket ${socket._socket.remoteAddress} left room ${room}.`);
    } else if (data.type === "delete-room") {
        const room = getRoomCode(socket);

        if (!room) {
            socket.send(JSON.stringify({ type: "error", message: "You are not in a room" }));
            console.log(`Socket ${socket._socket.remoteAddress} tried to delete a room, but is not in a room.`);
            return;
        }

        if (isCreator(room, socket)) {
            socket.send(JSON.stringify({ type: "error", message: "Only the room creator can delete the room" }));
            console.log(`Socket ${socket._socket.remoteAddress} tried to delete room ${room}, but it is not the creator.`);
            return;
        }

        removeRoom(room);
        console.log(`Socket ${socket._socket.remoteAddress} deleted room ${room}.`);
    }
}

module.exports = { handleRoomEvents };
