class Deck:
    def __init__(self):
        self.cards = [f"{rank}{suit}" for rank in "23456789TJQKA" for suit in "CDHS"]
        self.shuffle()
