const { handleRoomEvents } = require('../roomEvents');
const { addMember, createRoom, getRoom, getRoomCode, isCreator, removeMember, removeRoom } = require('../store');

jest.mock('../store');

describe('handleRoomEvents', () => {
    let socket;

    beforeEach(() => {
        socket = {
            send: jest.fn(),
            _socket: { remoteAddress: '127.0.0.1' }
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should create a room', () => {
        getRoomCode.mockReturnValue(null);
        getRoom.mockReturnValue(null);
        createRoom.mockImplementation(() => {});

        const data = { type: 'create-room' };
        handleRoomEvents(socket, data);

        expect(getRoomCode).toHaveBeenCalledWith(socket);
        expect(createRoom).toHaveBeenCalled();
        expect(socket.send).toHaveBeenCalledWith(expect.stringContaining('"type":"room-created"'));
    });

    test('should not create a room if already in a room', () => {
        getRoomCode.mockReturnValue('123456');

        const data = { type: 'create-room' };
        handleRoomEvents(socket, data);

        expect(socket.send).toHaveBeenCalledWith(expect.stringContaining('"type":"error"'));
    });

    test('should join a room', () => {
        getRoomCode.mockReturnValue(null);
        getRoom.mockReturnValue({ code: '123456' });
        addMember.mockImplementation(() => {});

        const data = { type: 'join-room', room: '123456' };
        handleRoomEvents(socket, data);

        expect(getRoomCode).toHaveBeenCalledWith(socket);
        expect(getRoom).toHaveBeenCalledWith('123456');
        expect(addMember).toHaveBeenCalledWith('123456', socket);
        expect(socket.send).toHaveBeenCalledWith(expect.stringContaining('"type":"room-joined"'));
    });

    test('should not join a room if already in a room', () => {
        getRoomCode.mockReturnValue('123456');

        const data = { type: 'join-room', room: '654321' };
        handleRoomEvents(socket, data);

        expect(socket.send).toHaveBeenCalledWith(expect.stringContaining('"type":"error"'));
    });

    test('should leave a room', () => {
        getRoomCode.mockReturnValue('123456');
        removeMember.mockImplementation(() => {});

        const data = { type: 'leave-room' };
        handleRoomEvents(socket, data);

        expect(getRoomCode).toHaveBeenCalledWith(socket);
        expect(removeMember).toHaveBeenCalledWith('123456', socket);
        expect(socket.send).toHaveBeenCalledWith(expect.stringContaining('"type":"room-left"'));
    });

    test('should not leave a room if not in a room', () => {
        getRoomCode.mockReturnValue(null);

        const data = { type: 'leave-room' };
        handleRoomEvents(socket, data);

        expect(socket.send).toHaveBeenCalledWith(expect.stringContaining('"type":"error"'));
    });

    test('should delete a room', () => {
        getRoomCode.mockReturnValue('123456');
        isCreator.mockReturnValue(true);
        removeRoom.mockImplementation(() => {});

        const data = { type: 'delete-room' };
        handleRoomEvents(socket, data);

        expect(getRoomCode).toHaveBeenCalledWith(socket);
        expect(isCreator).toHaveBeenCalledWith('123456', socket);
        expect(removeRoom).toHaveBeenCalledWith('123456');
        expect(socket.send).toHaveBeenCalledWith(expect.stringContaining('"type":"room-deleted"'));
    });

    test('should not delete a room if not the creator', () => {
        getRoomCode.mockReturnValue('123456');
        isCreator.mockReturnValue(false);

        const data = { type: 'delete-room' };
        handleRoomEvents(socket, data);

        expect(getRoomCode).toHaveBeenCalledWith(socket);
        expect(isCreator).toHaveBeenCalledWith('123456', socket);
        expect(removeRoom).not.toHaveBeenCalled();
        expect(socket.send).toHaveBeenCalledWith(expect.stringContaining('"type":"error"'));
    });
});