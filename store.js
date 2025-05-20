let rooms = [];

const getRooms = () => {
    return rooms;
}

const setRooms = (newRooms) => {
    rooms = newRooms;
}

const getRoomCode = (socket) => {
    for (const room of rooms) {
        if (room.members.includes(socket)) {
            return room.code;
        }
    }
    return null;
}

const getRoom = (code) => {
    return rooms.find((v) => v.code === code);
}

const setRoom = (room) => {
    rooms = rooms.map((v) => {
        if(v.code === room.code) {
            return room;
        }
        return v;
    });
}

const addRoom = (room) => {
    rooms.push(room);
}

const createRoom = (code, creator) => {
    rooms.push({ code, members: [creator] });
}

const removeRoom = (code) => {
    if(getMembers(code).length !== 0) {
        getMembers(code).forEach((member) => {
            member.send(JSON.stringify({ type: "room-deleted" }));
        });
    }
    rooms = rooms.filter((v) => v.code !== code);
}

const addMember = (code, member) => {
    rooms.find((v) => v.code === code).members.push(member);
}

const removeMember = (code, member) => {
    rooms.find((v) => v.code === code).members = rooms.find((v) => v.code === code).members.filter((v) => v !== member);

    if(getMembers(code).length === 0) {
        removeRoom(code);
    }
}

const getMembers = (code) => {
    return rooms.find((v) => v.code === code).members;
}

const isCreator = (member) => {
    return !!rooms.find((v) => v.members[0] === member);
}

const startGame = (code) => {
    setRoom({ ...getRoom(code), gameStarted: true });
    dealCards(code);
    setStartingBalances(code);
    setRoom({ ...getRoom(code), turn: getMembers(code)[0] });

    getRoom(code).members.forEach((member) => {
        member.send(JSON.stringify({ type: "game-started", table: getRoom(code).table, deck: getRoom(code).decks[member], balance: getRoom(code).balances[member] }));
    });

    getRoom(code).members.forEach((member) => {
        if(member === getRoom(code).turn) {
            member.send(JSON.stringify({ type: "your-turn" }));
        }
    });
}

const isGameStarted = (code) => {
    return rooms.find((v) => v.code === code)?.gameStarted;
}

const dealCards = (code) => {
    const CARDS_PER_PLAYER = 2;
    const CARDS_ON_TABLE = 5;

    let cards = [
        "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC", "QC", "KC", "AC",
        "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD", "AD",
        "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH", "AH",
        "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS", "AS"
    ];

    let room = getRoom(code);
    const players = getMembers(code);

    room.decks = {};
    room.table = [];

    players.forEach((player) => {
    room.decks[player] = [];
        for (let i = 0; i < CARDS_PER_PLAYER; i++) {
            const index = Math.floor(Math.random() * cards.length);
            room.decks[player].push(cards[index]);
            cards.splice(index, 1);
        }
    });

    for (let i = 0; i < CARDS_ON_TABLE; i++) {
        const index = Math.floor(Math.random() * cards.length);
        room.table.push(cards[index]);
        cards.splice(index, 1);
    }

    setRoom(room);
}

const setStartingBalances = (code) => {
    const STARTING_BALANCE = 1000;

    const room = getRoom(code);
    const players = getMembers(code);

    room.balances = {};

    players.forEach((player) => {
        room.balances[player] = STARTING_BALANCE;
    });

    setRoom(room);
}

module.exports = {
    getRooms,
    setRooms,
    getRoomCode,
    getRoom,
    addRoom,
    createRoom,
    removeRoom,
    addMember,
    removeMember,
    getMembers,
    isCreator,
    startGame,
    isGameStarted
};