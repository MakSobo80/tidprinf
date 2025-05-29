# roomEvents.js

### Opis ogólny:
Obsługuje logikę tworzenia, dołączania, opuszczania i usuwania pokoi. Plik eksportuje funkcję `handleRoomEvents`, która analizuje typy zdarzeń związanych z obsługą pokoi.

### Szczegóły funkcji:

- **Importowane funkcje z store.js:**
  - `addMember`, `createRoom`, `getRoom`, `getRoomCode`, `isCreator`, `removeMember`, `removeRoom`

- **handleRoomEvents(socket, data):**
  - Rozpoznaje następujące typy zdarzeń:
    - `"create-room"`: Tworzy nowy pokój z unikalnym kodem (6 cyfr). Weryfikuje, czy socket nie jest już w pokoju.
    - `"join-room"`: Pozwala klientowi dołączyć do istniejącego pokoju, jeśli nie jest już w jakimś pokoju i pokój istnieje.
    - `"leave-room"`: Pozwala opuścić pokój, jeśli klient w nim jest.
    - `"delete-room"`: Pozwala twórcy pokoju na jego usunięcie.
  - Każda akcja jest logowana do konsoli dla celów debugowania.
  - Wysyła odpowiednie odpowiedzi JSON przez WebSocket do klienta.

- **Eksport:**  
  Eksportuje funkcję `handleRoomEvents`.

---
