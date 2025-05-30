# gameEvents.js

### Opis ogólny:
Obsługa zdarzeń związanych z rozpoczęciem gry na serwerze. Plik eksportuje funkcję `handleGameEvents`, która analizuje żądania od klientów dotyczące startu gry i weryfikuje warunki uruchomienia rozgrywki.

### Szczegóły funkcji:

- **Importowane funkcje z store.js:**
  - `getMembers(room)` – zwraca listę graczy w pokoju
  - `getRoomCode(socket)` – zwraca kod pokoju, w którym znajduje się dany socket
  - `isCreator(socket)` – sprawdza, czy użytkownik jest twórcą pokoju
  - `isGameStarted(room)` – sprawdza, czy gra została już rozpoczęta
  - `startGame(room)` – rozpoczyna grę w danym pokoju

- **handleGameEvents(socket, data):**
  - Przyjmuje dwa argumenty:
    - `socket` – połączenie WebSocket z klientem
    - `data` – obiekt zawierający typ zdarzenia i ewentualne dane dodatkowe
  - Obsługuje tylko jeden typ zdarzenia: `"start-game"`
    1. Sprawdza, czy socket jest w pokoju (`getRoomCode`). Jeśli nie – wysyła błąd.
    2. Sprawdza, czy socket jest twórcą pokoju. Jeśli nie – wysyła błąd.
    3. Wymaga co najmniej dwóch graczy w pokoju, w przeciwnym razie odrzuca żądanie.
    4. Sprawdza, czy gra już się nie rozpoczęła – jeśli tak, odrzuca.
    5. Jeśli wszystkie warunki są spełnione, wywołuje `startGame` i informuje klienta o rozpoczęciu gry.
    6. Zwraca `true` przy powodzeniu, w pozostałych przypadkach kończy działanie funkcji.

- **Eksport:**  
  Eksportuje funkcję `handleGameEvents`.

---
