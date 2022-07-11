import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Tornando o Square para um componente de função que recebe props como entrada e retorna o que deverá ser renderizado.
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  // construtor adicionado ao tabuleiro que define seu estado inicial como um array de 9 posições preenchidas por null
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      // sempre que uma jogada for feita xIsNext trocará seu valor determinando qual jogador será o próximo
      xIsNext: true,
    };
  }

  // função handleClick manupula os eventos onClick
  handleClick(i) {
    // o comando slice() cria uma cópia do array de quadrados para o modificar ao invés de faze-lo no array existente.
    const squares = this.state.squares.slice();
    // verificando se algum jogador ja venceu ou se o quadrado já está ocupado
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // a mudança de "X" e "O" determinará os turnos
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        // definindo oo valor a partir do estado
        value={this.state.squares[i]}
        // guardadno quais quadrados foram preenchidos
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    // verificando se um jogador venceu
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

// definindo o vencedor
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
