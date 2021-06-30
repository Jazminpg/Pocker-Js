const URL = 'http://localhost:4040';

const startBtn = document.querySelector('.start-btn');

const refresh = () => {
  const nodesToRemove = document.querySelectorAll('.rm');
  nodesToRemove.forEach(node => {
    node.parentElement.removeChild(node);
  });
};

createCardSymbols = (symbol, value, parent) => {
  const symbolContainer = document.createElement('div');
  symbolContainer.className = 'symbols';

  const isNumber = !isNaN(value);

  if (isNumber) {
    const symbolArray = new Array(parseInt(value)).fill(symbol);
    symbolArray.forEach(symbol => {
      const container = document.createElement('div');
      container.innerText = symbol;
      symbolContainer.appendChild(container);
    });
  }

  if (value === 'A') {
    const container = document.createElement('div');
    container.innerText = symbol;
    symbolContainer.appendChild(container);
  }

  parent.appendChild(symbolContainer);
};

const createCard = (cardValue, parent, isDeckCard, index) => {
  const card = document.createElement('li');
  const valueArray = cardValue.split('');
  const symbol = valueArray.pop();
  const value = valueArray.join('');

  const createCardCorners = cornerNumber => {
    const cardCorner = document.createElement('div');
    cardCorner.className = `card-corner corner-${cornerNumber}`;
    [symbol, value].forEach(char => {
      const charContainer = document.createElement('p');
      charContainer.textContent = char;
      cardCorner.appendChild(charContainer);
    });
    card.appendChild(cardCorner);
  };

  createCardCorners(1);
  createCardCorners(2);

  createCardSymbols(symbol, value, card);

  card.className = `card ${symbol} card-${value}`;

  if (isDeckCard) {
    card.style.left = `${index * 20}px`;
    card.style.transform = `rotate(${index *
      2}deg) translate(${index}%, ${index * 3}%)`;
    card.style.zIndex = index;
  }

  parent.appendChild(card);
};

const createDeck = (crupier, remainingCards)=> {
  const deckList = document.createElement('ul');
  deckList.className = 'rm';
  crupier.forEach((card, index) => {
    createCard(card, deckList, true, index);
  });
  const listContainer = document.querySelector('.deck');
  const totalCardCount = document.createElement('p');
  totalCardCount.className = 'rm';
  totalCardCount.textContent = `Cards in deck: ${remainingCards.length}`;
  listContainer.appendChild(totalCardCount);
  listContainer.appendChild(deckList);
};

const createPlayersHands = currentHands => {
  Object.keys(currentHands).forEach(player => {
    const playerContainer = document.querySelector('.player-hands');
    const playerArea = document.createElement('div');
    playerArea.className = 'rm player-area';
    const playerName = document.createElement('h3');
    playerName.innerText = player;
    playerArea.appendChild(playerName);
    const playerHand = document.createElement('ul');
    currentHands[player].cards.forEach(playerCard => {
      createCard(playerCard, playerHand);
    });
    playerArea.appendChild(playerHand);
    playerContainer.appendChild(playerArea);
  });
};

const fetchHands = async () => {
  refresh();
  try {
    const response = await fetch(`${URL}/play`);
    const sortedCards = await response.json();
    return sortedCards;
  } catch (error) {
    console.warn(error);
  }
};

const setupGame = async () => {
  const sortedCards = await fetchHands();

  const { currentHands, crupier, remainingCards } = sortedCards;

  createDeck(crupier, remainingCards);
  createPlayersHands(currentHands);
};

startBtn.addEventListener('click', setupGame);
