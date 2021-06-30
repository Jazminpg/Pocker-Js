const { Deck, Hand } = require('./deck');

const deck = new Deck();

test('deck should be shuffled', () => {
  expect(deck.cards.length).toBe(52);
});

test('deck should return 5 deck', () => {
  expect(deck.cards.length).toBeGreaterThan(5);
  const hand = new Hand(deck, 5);
  expect(hand.cards.length).toBe(5);
});

test('deck should return random cards', () => {
  const hand = new Hand(deck, 5);
  const handObject = Object.fromEntries(
    hand.cards.map(card => {
      return [card, ''];
    })
  );

  expect(Object.keys(handObject).length).toBe(5);
});
