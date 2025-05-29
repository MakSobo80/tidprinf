# store.js

### Opis ogólny:
Trzyma w pamięci (RAM) stan pokoi, graczy i rozgrywki na serwerze. Udostępnia funkcje do zarządzania pokojami, graczami i rozpoczęciem gry.

### Szczegóły funkcji:

- **rooms**:  
  Tablica wszystkich pokoi (`[{code, members, ...}]`).

- **getRooms, setRooms**:  
  Pobieranie i ustawianie całej tablicy pokoi.

- **getRoomCode(socket)**:  
  Znajduje kod pokoju, w którym dany socket się znajduje (przeszukuje wszystkich członków wszystkich pokoi).

- **getRoom(code)**:  
  Zwraca dane pokoju o danym kodzie.

- **setRoom(room)**:  
  Aktualizuje obiekt pokoju w tablicy.

- **addRoom(room)/createRoom(code, creator)**:  
  Dodaje nowy pokój do listy. `createRoom` ustawia twórcę.

- **removeRoom(code)**:  
  Usuwa pokój po kodzie. Wysyła powiadomienie do wszystkich członków pokoju, jeśli nie jest pusty.

- **addMember(code, member)**:  
  Dodaje gracza do pokoju o danym kodzie.

- **removeMember(code, member)**:  
  Usuwa gracza z pokoju. Jeśli pokój jest pusty po usunięciu, kasuje go.

- **getMembers(code)**:  
  Zwraca wszystkich członków pokoju.

- **isCreator(member)**:  
  Sprawdza, czy dany gracz jest twórcą pokoju (pierwszy w tablicy członków).

- **startGame(code)**:  
  Ustawia flagę `gameStarted: true`, rozdaje karty, ustawia początkowe saldo, ustawia pierwszego gracza.

- **isGameStarted(code)**:  
  Sprawdza, czy gra w danym pokoju została już rozpoczęta.

- **dealCards(code)**:  
  Losowo rozdaje karty do graczy i na stół (Texas Hold'em).

- **setStartingBalances(code)**:  
  Nadaje każdemu graczowi początkowy stan konta.

- **Eksport:**  
  Eksportuje wszystkie powyższe funkcje.

---
