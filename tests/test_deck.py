import unittest
from deck import Deck

class TestDeck(unittest.TestCase):
    def test_initialization(self):
        deck = Deck()
        self.assertEqual(len(deck.cards), 52)

    def test_shuffle(self):
        deck = Deck()
        original_order = deck.cards[:]
        deck.shuffle()
        self.assertNotEqual(deck.cards, original_order)

    def test_draw_card(self):
        # Test if draw_card removes and returns the top card
        deck = Deck()
        initial_size = len(deck.cards)
        card = deck.draw_card()
        self.assertIsNotNone(card)
        self.assertEqual(len(deck.cards), initial_size - 1)

    def test_draw_card_empty_deck(self):
        # Test if draw_card raises an exception for an empty deck
        deck = Deck()
        deck.cards = []  # Empty the deck
        with self.assertRaises(IndexError):
            deck.draw_card()

if __name__ == "__main__":
    unittest.main()