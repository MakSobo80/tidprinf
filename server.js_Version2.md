# server.js

### Opis ogólny:
Główny plik uruchamiający serwer WebSocket. Rozdziela zdarzenia dotyczące pokoi i gry do odpowiednich handlerów, zarządza połączeniami i rozłączeniami klientów.

### Szczegóły działania:

- **Importy:**
  - `WebSocket` – biblioteka do obsługi połączeń websocket
  - `handleRoomEvents` – obsługa zdarzeń pokoi
  - `removeMember`, `getRoomCode` – funkcje pomocnicze do zarządzania członkami pokoi
  - `handleGameEvents` – obsługa zdarzeń gry

- **Inicjalizacja serwera:**
  - `wss = new WebSocket.Server({ port: 8080 })` – uruchamia serwer na porcie 8080

- **Obsługa nowych połączeń:**
  - Wysyła wiadomość powitalną do klienta
  - Loguje połączenie

- **Obsługa wiadomości:**
  - Jeśli typ wiadomości dotyczy pokoju, kieruje ją do `handleRoomEvents`
  - W przeciwnym razie próbuje obsłużyć jako zdarzenie gry (`handleGameEvents`)
  - Jeśli żaden handler nie obsłuży zdarzenia, odsyła błąd

- **Obsługa zamykania połączenia:**
  - Informuje klienta o rozłączeniu
  - Jeśli klient był w pokoju, usuwa go z listy członków pokoju
  - Loguje rozłączenie

---
