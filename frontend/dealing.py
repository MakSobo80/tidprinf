from deck import Deck

def deal_cards(players):
    deck = Deck()
    player_hands = {player.name: deck.deal(2) for player in players}
    community_cards = deck.deal(5)
    return player_hands, community_cards