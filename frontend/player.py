class Player:
    def __init__(self, cards, balance, hasFolded, name):
        self.cards = cards
        self.balance = balance
        self.hasFolded = hasFolded
        self.name = name

    def set_cards(self, cards):
        self.cards = cards