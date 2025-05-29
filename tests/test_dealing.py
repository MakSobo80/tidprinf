import unittest
from dealing import deal_cards
from player import Player

class Dealing(unittest.TestCase):
    def test_deal_cards(self):
        players = [Player(None, 1000, False, f"Player{i}") for i in range(4)]
        player_hands, community_cards = deal_cards(players)

        self.assertEqual(len(player_hands), 4)
        for hand in player_hands.values():
            self.assertEqual(len(hand), 2)

        self.assertEqual(len(community_cards), 5)