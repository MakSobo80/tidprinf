# Dokumentacja kodu – tidprinf (Poker w PyGame)

## Struktura projektu

- `main.py` – Główny punkt wejścia do gry (Python, testowy print, docelowo uruchamianie gry).
- `store.js` – Zarządza pokojami gry, graczami, logiką startu gry, rozdzielaniem kart, saldami, itp.
- `roomEvents.js` – Obsługuje zdarzenia związane z pokojami (tworzenie, dołączanie, opuszczanie, usuwanie pokojów).
- `gameEvents.js` – Obsługuje zdarzenia związane z rozgrywką (start gry, sprawdzanie uprawnień).
- `server.js` – Serwer WebSocket obsługujący komunikację sieciową, zarządzający zdarzeniami z `roomEvents` i `gameEvents`.
- `tests/` – Zawiera testy jednostkowe dla głównych modułów backendu.
- `assets/` – Zasoby gry: grafiki, dźwięki, itp.

## Opis kluczowych plików

### store.js
Moduł odpowiada za zarządzanie całą logiką pokoi gry:
- Tworzenie, usuwanie, modyfikowanie pokojów (`createRoom`, `removeRoom`).
- Dodawanie/Usuwanie członków (`addMember`, `removeMember`).
- Zarządzanie grą – rozdzielanie kart (`dealCards`), salda graczy (`setStartingBalances`), start gry (`startGame`).
- Eksportuje funkcje do obsługi przez inne moduły.

### roomEvents.js
Moduł przetwarza wszystkie zdarzenia związane z pokojami:
- Tworzenie, dołączanie, opuszczanie i usuwanie pokoju.
- Walidacja, czy gracz może wykonać daną akcję (np. tylko twórca może usunąć pokój).

### gameEvents.js
Obsługa zdarzeń związanych z rozgrywką:
- Start gry – tylko twórca może rozpocząć, wymagane min. 2 osoby w pokoju.
- Walidacje uprawnień.

### server.js
Serwer WebSocket:
- Nasłuchuje połączeń, przekazuje zdarzenia do odpowiednich modułów.
- Obsługuje rozłączanie użytkownika i sprzątanie po nim.

### tests/
Testy jednostkowe (np. `test_store.js`, `test_roomEvents.js`):
- Sprawdzają poprawność operacji na pokojach, graczach, uprawnieniach.
- Wykorzystują mockowanie do izolacji testów.

## Przykład przepływu gry

1. Gracz tworzy pokój (żądanie trafia do roomEvents.js).
2. Inni gracze dołączają do pokoju.
3. Twórca uruchamia grę (gameEvents.js) – następuje rozdanie kart i ustawienie sald.
4. Gra odbywa się zgodnie z zasadami pokera Texas Hold’em.

## Testowanie

Testy uruchamiasz poleceniem (w katalogu głównym, np. dla Jesta):
```sh
npm test
```
albo dla Pythona (jeśli są testy):
```sh
pytest
```
