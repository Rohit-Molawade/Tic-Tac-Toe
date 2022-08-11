let start = document.getElementById("start");

////////////////////////////////Game Board Module\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
let gameboard = (function () {
  let _game_board = [
    ["x1", "x2", "x3"],
    ["y1", "y2", "y3"],
    ["z1", "z2", "z3"],
  ];
  let _gameboard_container = document.getElementById("board");
  let _count = 0;

  function generate_board() {
    _game_board.forEach((array) => {
      array.forEach((cell) => {
        let div = document.createElement("div");

        div.setAttribute("class", "cell");
        div.dataset.cell = cell;
        div.dataset.checked = "false";
        _gameboard_container.appendChild(div);
      });
    });
  }

  function _getindex(x) {
    for (let i = 0; i < _game_board.length; i++) {
      let index = _game_board[i].indexOf(x);
      if (index > -1) return [i, index];
    }
  }

  function _mark(div, symbol) {
    let span = document.createElement("span");
    let array = _getindex(div.dataset.cell);
    span.textContent = symbol;
    span.className = symbol;
    div.appendChild(span);
    div.dataset.checked = "true";
    _game_board[array[0]][array[1]] = symbol;
    check_win(symbol);
  }

  function select(e, chance) {
    let div = e.target;
    if (e.target.dataset.checked === "false") {
      if (chance === "X") _mark(div, "X");
      else if (chance === "O") _mark(div, "O");

      display_controller.toggle_chance();
    } else {
      alert("Already checked");
    }
  }

  function check_win(symbol) {
    _count++;
    let _row = 0,
      _col = 0,
      _dr = 0,
      _dl = 0,
      _win = 3;
    for (let i = 0; i < _game_board.length; i++) {
      for (let j = 0; j < _game_board[i].length; j++) {
        _game_board[j][i] === symbol ? _col++ : (_col = 0); //Check in row
        _game_board[i][j] === symbol ? _row++ : (_row = 0); //Check in col

        //Check diagonally
        if (_game_board[i][j] === symbol && i < _game_board.length - _win + 1) {
          _dr = 0;
          _dl = 0;
          for (let z = 0; z < _win; z++) {
            _game_board[i + z][j + z] === symbol ? _dr++ : (_dr = 0);
            _game_board[i + z][j - z] === symbol ? _dl++ : (_dl = 0);
          }
        }
      }
      if (
        (_col === _win || _row === _win || _dr === _win || _dl === _win) &&
        symbol === "X"
      ) {
        alert("Player 1 WON!");
        return true;
      } else if (
        (_col === _win || _row === _win || _dr === _win || _dl === _win) &&
        symbol === "O"
      ) {
        alert("Player 2 WON!");
        return true;
      }
      _row = 0;
    }
  }

  return { generate_board, select };
})();

//////////////////////////////////////Player Factory Function\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
let player = function () {
  let _name, _symbol;
  function set_info(n, s) {
    _name = n;
    _symbol = s;
  }
  return { set_info };
};

//Player Objects
let player1 = player;
let player2 = player;

////////////////////////////////Display Module\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
let display_controller = (function () {
  let _chance = "X";

  function get_chance() {
    return _chance;
  }

  function toggle_chance() {
    if (_chance === "X") _chance = "O";
    else if (_chance === "O") _chance = "X";
  }
  return { get_chance, toggle_chance };
})();

start.addEventListener("click", () => {
  player1.set_info("Player1", "X");
  player2.set_info("Player2", "O");
});

gameboard.generate_board();

let board = document.getElementsByClassName("cell"); //Get a NodeList of all cells
let board_array = Array.from(board); //Convert Node list to Array

board_array.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    gameboard.select(e, display_controller.get_chance());
  });
});
