import unittest
from player import Player

class TestPlayer(unittest.TestCase):
    def test_initialization(self):
        player = Player(cards=None, balance=1000, hasFolded=False, name="Player1")
        self.assertIsNone(player.cards)
        self.assertEqual(player.balance, 1000)
        self.assertFalse(player.hasFolded)
        self.assertEqual(player.name, "Player1")

    def test_set_cards(self):
        player = Player(cards=None, balance=1000, hasFolded=False, name="Player1")
        new_cards = ["AS", "KH"]
        player.set_cards(new_cards)
        self.assertEqual(player.cards, new_cards)

    def test_set_cards_empty(self):
        player = Player(cards=None, balance=1000, hasFolded=False, name="Player1")
        player.set_cards([])
        self.assertEqual(player.cards, [])

    def test_set_cards_invalid(self):
        player = Player(cards=None, balance=1000, hasFolded=False, name="Player1")
        with self.assertRaises(TypeError):
            player.set_cards(None)

if __name__ == "__main__":
    unittest.main()