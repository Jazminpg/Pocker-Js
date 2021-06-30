const express = require('express');
const path = require('path');
const { Deck, Hand } = require('./cards/deck');
const cors = require('cors');

const app = express();

const PORT = 4040;

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

const deck = new Deck();
/*const tableHand = deck.getNewHand(5);*/

const tableHand = new Hand(deck, 5);



app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/get-table-hand', (req, res) => {
  res.send(tableHand);
});

app.get('/get-hand/:size', (req, res) => {
  const { size } = req.params;
  const playerHand = new Hand(deck, parseInt(size));
  res.send(playerHand);
});

app.post('/player', (req, res) => {
  const {
    body: { user }
  } = req;
  res.json({
    user
  });
});

app.get('/play', (req, res) => {
  const currentHands = {};
  for (let i = 1; i <= 5; i++) {
    const hand = new Hand(deck, 2);
    currentHands[`player${i}`] = hand;
  }
  res.send({
    crupier: tableHand.cards, 
    remainingCards: deck.cards,
    currentHands
  });
});

app.listen(PORT, () => {
  console.log('App listening on port ${PORT} ');
});
