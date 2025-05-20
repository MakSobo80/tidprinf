const { addRoom, removeRoom, getRoom, addMember, removeMember, getMembers, getRoomCode, isCreator, isGameStarted, startGame, createRoom } = require('../store');

describe('store', () => {
    let socket;

    beforeEach(() => {
        socket = { _socket: { remoteAddress: '127.0.0.1' }, send: jest.fn() };
    });

    test('should add a room', () => {
        createRoom('123456', socket);
        const room = getRoom('123456');
        expect(room).toBeDefined();
        expect(room.code).toBe('123456');
    });

    test('should remove a room', () => {
        createRoom('123456', socket);
        removeRoom('123456');
        const room = getRoom('123456');
        expect(room).toBeUndefined();
    });

    test('should add a member to a room', () => {
        createRoom('123456', socket);
        const newSocket = { _socket: { remoteAddress: '127.0.0.2' }, send: jest.fn() };
        addMember('123456', newSocket);
        const members = getMembers('123456');
        expect(members).toContain(newSocket);
    });

    test('should remove a member from a room', () => {
        createRoom('123456', socket);
        addMember('123456', socket);
        removeMember('123456', socket);
        const members = getMembers('123456');
        expect(members).not.toContain(socket);
    });

    test('should get room code for a socket', () => {
        createRoom('123456', socket);
        const roomCode = getRoomCode(socket);
        expect(roomCode).toBe('123456');
    });

    test('should check if a socket is the creator of a room', () => {
        createRoom('123456', socket);
        const result = isCreator(socket);
        expect(result).toBe(true);
    });

    test('should check if a game is started', () => {
        createRoom('123456', socket);
        startGame('123456');
        const result = isGameStarted('123456');
        expect(result).toBe(true);
    });
});