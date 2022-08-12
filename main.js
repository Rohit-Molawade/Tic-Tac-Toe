let start = document.getElementById("start");
let restart = document.getElementById("restart");

////////////////////////////////Game Board Module\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
let gameboard = (function () {
  let _game_board = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
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

  function refresh_board() {
    let count = 0;
    for (let i = 0; i < _game_board.length; i++) {
      for (let j = 0; j < _game_board.length; j++) {
        ++count;
        _game_board[i][j] = count.toString();
      }
    }
  }

  function refresh_symbol() {
    let board = document.getElementsByClassName("cell"); //Get a NodeList of all cells
    let board_array = Array.from(board); //Convert Node list to Array

    board_array.forEach((cell) => {
      cell.dataset.checked = "false";
      if (cell.firstChild !== null) cell.removeChild(cell.firstChild);
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
    _check_win(symbol);
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

  function _check_win(symbol) {
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
        display_controller.display_winner("Player 1");
        _count = 0;
        return true;
      } else if (
        (_col === _win || _row === _win || _dr === _win || _dl === _win) &&
        symbol === "O"
      ) {
        display_controller.display_winner("Player 2");
        _count = 0;
        return true;
      } else if (_count >= 9) {
        display_controller.display_winner("Match Tied");
        _count = 0;
        return true;
      }
      _row = 0;
    }
  }

  return { generate_board, select, refresh_board, refresh_symbol };
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
  let _win_container = document.getElementById("win-container");
  let _back = document.getElementById("back");
  function get_chance() {
    return _chance;
  }

  function toggle_chance() {
    if (_chance === "X") _chance = "O";
    else if (_chance === "O") _chance = "X";
  }

  function refresh_chance() {
    _chance = "X";
  }

  function display_winner(winner) {
    let msg = document.createElement("span");
    if (winner === "Match Tied") msg.textContent = `${winner}`;
    else msg.textContent = `${winner} Won!!!`;
    _back.appendChild(msg);
    _win_container.style.display = "block";
  }

  function restart_game() {
    _win_container.style.display = "none";
    _back.removeChild(_back.lastChild);
    gameboard.refresh_board();
    gameboard.refresh_symbol();
    refresh_chance();
  }

  return { get_chance, toggle_chance, display_winner, restart_game };
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

restart.addEventListener("click", display_controller.restart_game);