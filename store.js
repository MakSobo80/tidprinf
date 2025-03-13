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
    return rooms.find((v) => v.members[0] === member);
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
    isCreator
};