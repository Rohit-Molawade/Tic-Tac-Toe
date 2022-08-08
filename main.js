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
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        let div = document.createElement("div");

        div.setAttribute("class", "cell");
        div.dataset.cell = cell;
        div.appendChild(svg);
        cell = div;
        _gameboard_container.appendChild(div);
      });
    });
  }

  /*let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        let svg = cell.firstChild;
        let line1 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
          );
          line1.setAttribute("x1", 10);
          line1.setAttribute("y1", 10);
          line1.setAttribute("x2", 100);
          line1.setAttribute("y2", 100);
          line1.setAttribute("stroke", "white");
          line1.setAttribute("stroke-width", 2);
          svg.appendChild(line1);
        if (player == "X") {
          let line2 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
          );
          line2.setAttribute("x1", 10);
          line2.setAttribute("y1", 10);
          line2.setAttribute("x2", 100);
          line2.setAttribute("y2", 100);
          line2.setAttribute("stroke", "white");
          line2.setAttribute("stroke-width", 2);
          svg.appendChild(line2);
        } else if (player === "O") {
        }
      });*/
  return { generate_board };
})();

gameboard.generate_board();
