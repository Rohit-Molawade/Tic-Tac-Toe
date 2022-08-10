let start = document.getElementById("start");

let gameboard = (function () {
  let _game_board = [
    ["x1", "x2", "x3"],
    ["y1", "y2", "y3"],
    ["z1", "z2", "z3"],
  ];
  let _gameboard_container = document.getElementById("board");

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

  function getindex(x) {
    for (let i = 0; i < _game_board.length; i++) {
      let index = _game_board[i].indexOf(x);
      if (index > -1) return [i,index];
    };
  }

  function _markX(e,div) {
    let span = document.createElement("span");
    let array = getindex(div.dataset.cell);
    span.textContent = "X";
    span.className = "X";
    div.appendChild(span);
    div.dataset.checked = "true";
    _game_board[array[0]][array[1]] = 'X';
  }

  function _markO(e,div) {
    let span = document.createElement("span");
    let array = getindex(div.dataset.cell);
    span.textContent = "O";
    span.className = "O";
    div.appendChild(span);
    div.dataset.checked = "true";
    _game_board[array[0]][array[1]] = 'O';
  }

  function select(e, chance) {
    let div = e.target;
    if (e.target.dataset.checked === "false") {
      if (chance === "X") _markX(e.target,div);
      else if (chance === "O") _markO(e.target,div);

      display_controller.toggle_chance();
    } else {
      alert("Already checked");
    }
  }

  return { generate_board, select };
})();

let player = function () {
  let _name, _symbol;
  function set_info(n, s) {
    _name = n;
    _symbol = s;
  }
  return { set_info };
};

let player1 = player;
let player2 = player;

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
