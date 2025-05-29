# `test_dealing.py`

This file contains unit tests for the `deal_cards` function, which is responsible for distributing cards to players. The tests ensure that the function behaves correctly under various scenarios.

## Dependencies

- **Modules Tested**:
    - `deal_cards` (from `dealing`)

- **Mocked Modules**:
    - `player`:
        - `Player`

- **Testing Framework**:
    - `unittest`

## Test Suite: `Dealing`

### Setup and Teardown

- **Setup**:
    - Initializes a list of mock `Player` objects with:
        - `name`: Unique player names (`Player0`, `Player1`, etc.).
        - `balance`: Default balance of 1000.
        - `hasFolded`: Default value set to `False`.

### Tests

1. **`test_deal_cards`**
    - Verifies that each player receives exactly two cards.
    - Ensures the community receives exactly five cards.
    - Confirms the total number of cards dealt matches expectations.

## File Purpose

The purpose of this file is to ensure that the `deal_cards` function behaves as expected in various scenarios, including edge cases. It validates the logic for card distribution and ensures proper error handling when conditions are not met.