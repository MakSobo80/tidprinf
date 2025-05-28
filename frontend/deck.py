import random

class Deck:
    def __init__(self):
        self.cards = [f"{rank}{suit}" for rank in "23456789TJQKA" for suit in "CDHS"]
        self.shuffle()

    def shuffle(self):
        random.shuffle(self.cards)

    def deal(self, num_cards):
        if len(self.cards) < num_cards:
            raise ValueError("Not enough cards in the deck")
        dealt_cards = self.cards[:num_cards]
        self.cards = self.cards[num_cards:]
        return dealt_cards