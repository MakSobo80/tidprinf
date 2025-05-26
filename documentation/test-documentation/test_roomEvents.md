# `test_roomEvents.js` 

This file contains unit tests for the `handleRoomEvents` function, which is responsible for handling room-related events in the application. The tests ensure that the function behaves correctly under various scenarios.

## Dependencies

- **Modules Tested**:
    - `handleRoomEvents` (from `../roomEvents`)

- **Mocked Modules**:
    - `../store`:
        - `getRoomCode`
        - `addMember`
        - `removeMember`
        - `removeRoom`
        - `isCreator`

- **Testing Framework**:
    - Jest

## Test Suite: `handleRoomEvents`

### Setup and Teardown

- **`beforeEach`**:
    - Initializes a mock `socket` object with:
        - `send`: A mock function to simulate sending messages.
        - `_socket.remoteAddress`: A mock IP address (`127.0.0.1`).

- **`afterEach`**:
    - Clears all mock function calls to ensure test isolation.

### Tests

1. **`should leave a room`**
    - Verifies that a user can leave a room successfully.
    - Ensures the following functions are called:
        - `getRoomCode`
        - `removeMember`
    - Confirms the `socket.send` function sends a `"room-left"` message.

2. **`should not leave a room if not in a room`**
    - Ensures the user cannot leave a room if they are not in one.
    - Verifies that `socket.send` sends an error message.

3. **`should delete a room`**
    - Verifies that a room is deleted successfully when:
        - The user is the room creator.
    - Ensures the following functions are called:
        - `getRoomCode`
        - `isCreator`
        - `removeRoom`
    - Confirms the `socket.send` function sends a `"room-deleted"` message.

4. **`should not delete a room if not the creator`**
    - Ensures the room is not deleted if the user is not the creator.
    - Verifies that `removeRoom` is not called.
    - Confirms the `socket.send` function sends an error message.

## Mocked Functions

- **`getRoomCode`**:
    - Returns the room code associated with the socket.

- **`addMember`**:
    - Adds a member to the specified room.

- **`removeMember`**:
    - Removes a member from the specified room.

- **`removeRoom`**:
    - Deletes the specified room.

- **`isCreator`**:
    - Checks if the user is the creator of the room.

## File Purpose

The purpose of this file is to ensure that the `handleRoomEvents` function behaves as expected in various scenarios, including edge cases. It validates the logic for leaving and deleting rooms and ensures proper error handling when conditions are not met.