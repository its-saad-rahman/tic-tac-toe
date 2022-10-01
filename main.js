// Player consturctor
const player = (name, marker, ai, turn) => {
  return { name, marker, ai, turn };
};

//

const Game = (() => {
  const xMarker = 'x';
  const oMarker = 'o';
  winCombos = [
    [0, 1, 2],
    [0, 3, 6],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [0, 4, 8],
  ];
  let playerTurn;

  const getSelector = () => {
    const tiles = document.querySelectorAll('.tile');
    const message = document.querySelector('.message');
    const reset = document.querySelector('.reset');
    return { tiles, message, reset };
  };
  //Add player maker to board
  const displayCtrl = (e) => {
    getSelector().tiles.forEach((tile) =>
      tile.addEventListener('click', addMarker, { once: true })
    );
  };

  const addMarker = (e) => {
    const target = e.target;
    const currentClass = playerTurn ? oMarker : xMarker;
    showMarker(target, currentClass);
    if (checkWinner(currentClass)) {
      finishGame(false);
    } else if (isDraw()) {
      finishGame(true);
    } else {
      switchTurn();
    }
  };
  //Switching player turn
  const switchTurn = () => {
    playerTurn = !playerTurn;
  };
  //Show marker in DOM
  const showMarker = (target, currentClass) => {
    target.classList.add(currentClass);
  };
  //Check for winner
  const checkWinner = (currentClass) => {
    return winCombos.some((combo) => {
      return combo.every((index) => {
        return getSelector().tiles[index].classList.contains(currentClass);
      });
    });
  };
  //check for end game
  const finishGame = (draw) => {
    if (draw) {
      getSelector().message.innerText = `Draw! Nobody Wins`;
    } else {
      getSelector().message.innerText = `${
        playerTurn ? 'player O' : 'player X'
      } Wins!`;
    }
    getSelector().reset.classList.add('show');
  };
  //check for draw
  const isDraw = () => {
    return [...getSelector().tiles].every((tile) => {
      return (
        tile.classList.contains(xMarker) || tile.classList.contains(oMarker)
      );
    });
  };

  //reset Game
  const reset = () => {
    getSelector().tiles.forEach((tile) => {
      tile.classList.remove(xMarker);
      tile.classList.remove(oMarker);
      tile.removeEventListener('click', addMarker);
      tile.addEventListener('click', addMarker, { once: true });
    });
    getSelector().message.innerText = '';
    getSelector().reset.classList.remove('show');
  };
  getSelector().reset.addEventListener('click', reset);

  // Public methods
  return {
    init: function () {
      return displayCtrl();
    },
  };
})();

Game.init();
