const {getMembers, getRoomCode, isCreator, isGameStarted, startGame} = require("./store.js");

const handleGameEvents = (socket, data) => {
    if(data.type === "start-game") {
        const room = getRoomCode(socket);
        if(!room) {
            socket.send(JSON.stringify({ type: "error", message: "You are not in a room" }));
            console.log(`Socket ${socket._socket.remoteAddress} tried to start the game, but is not in a room.`);
            return;
        }

        if(!isCreator(socket)) {
            socket.send(JSON.stringify({ type: "error", message: "Only the room creator can start the game" }));
            console.log(`Socket ${socket._socket.remoteAddress} tried to start the game, but is not the creator.`);
            return;
        }

        if(getMembers(room).length < 2) {
            socket.send(JSON.stringify({ type: "error", message: "There must be at least 2 players to start the game" }));
            console.log(`Socket ${socket._socket.remoteAddress} tried to start the game, but there are not enough players.`);
            return;
        }

        if(isGameStarted(room)) {
            socket.send(JSON.stringify({ type: "error", message: "The game has already started" }));
            console.log(`Socket ${socket._socket.remoteAddress} tried to start the game, but it has already started.`);
            return;
        }

        startGame(room);
        socket.send(JSON.stringify({ type: "game-started" }));
        console.log(`Socket ${socket._socket.remoteAddress} started the game in room ${room}.`);
        return true;
    }
}

module.exports = { handleGameEvents };