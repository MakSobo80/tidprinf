const { handleGameEvents } = require('../gameEvents');
const { getMembers, getRoomCode, isCreator, isGameStarted, startGame } = require('../store');

jest.mock('../store');

describe('handleGameEvents', () => {
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

    test('should start the game', () => {
        getRoomCode.mockReturnValue('123456');
        isCreator.mockReturnValue(true);
        getMembers.mockReturnValue([socket, {}]);
        isGameStarted.mockReturnValue(false);
        startGame.mockImplementation(() => {});

        const data = { type: 'start-game' };
        handleGameEvents(socket, data);

        expect(getRoomCode).toHaveBeenCalledWith(socket);
        expect(isCreator).toHaveBeenCalledWith(socket);
        expect(getMembers).toHaveBeenCalledWith('123456');
        expect(isGameStarted).toHaveBeenCalledWith('123456');
        expect(startGame).toHaveBeenCalledWith('123456');
        expect(socket.send).toHaveBeenCalledWith(expect.stringContaining('"type":"game-started"'));
    });

    test('should not start the game if not in a room', () => {
        getRoomCode.mockReturnValue(null);

        const data = { type: 'start-game' };
        handleGameEvents(socket, data);

        expect(getRoomCode).toHaveBeenCalledWith(socket);
        expect(socket.send).toHaveBeenCalledWith(expect.stringContaining('"type":"error"'));
    });

    test('should not start the game if not the creator', () => {
        getRoomCode.mockReturnValue('123456');
        isCreator.mockReturnValue(false);

        const data = { type: 'start-game' };
        handleGameEvents(socket, data);

        expect(getRoomCode).toHaveBeenCalledWith(socket);
        expect(isCreator).toHaveBeenCalledWith(socket);
        expect(socket.send).toHaveBeenCalledWith(expect.stringContaining('"type":"error"'));
    });

    test('should not start the game if not enough players', () => {
        getRoomCode.mockReturnValue('123456');
        isCreator.mockReturnValue(true);
        getMembers.mockReturnValue([socket]);

        const data = { type: 'start-game' };
        handleGameEvents(socket, data);

        expect(getRoomCode).toHaveBeenCalledWith(socket);
        expect(isCreator).toHaveBeenCalledWith(socket);
        expect(getMembers).toHaveBeenCalledWith('123456');
        expect(socket.send).toHaveBeenCalledWith(expect.stringContaining('"type":"error"'));
    });

    test('should not start the game if already started', () => {
        getRoomCode.mockReturnValue('123456');
        isCreator.mockReturnValue(true);
        getMembers.mockReturnValue([socket, {}]);
        isGameStarted.mockReturnValue(true);

        const data = { type: 'start-game' };
        handleGameEvents(socket, data);

        expect(getRoomCode).toHaveBeenCalledWith(socket);
        expect(isCreator).toHaveBeenCalledWith(socket);
        expect(getMembers).toHaveBeenCalledWith('123456');
        expect(isGameStarted).toHaveBeenCalledWith('123456');
        expect(socket.send).toHaveBeenCalledWith(expect.stringContaining('"type":"error"'));
    });
});