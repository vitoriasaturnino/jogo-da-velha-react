import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// Square como componente de função (recebe props como entrada e retorna o que deve ser renderizado)
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
class Board extends React.Component {
  // "Movendo o state para cima"
  // com o construtor abaixo estamos fazendo que o Board, component pai de todos os squares guarde o state de cada um deles
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      // definindo o X como primeiro jogador (sempre que um jogador fizer uma jogada o valor da variavel será trocado determinando asssim de quem é a vez, X ou O e o state do jogo é salvo)
      xIsNext: true,
    };
  }

  // funcção que fara a manipulação do event do square que for clicado
  handleClick(i) {
    // a função slice() cria uma cópia do array a cada state modificado
    const squares = this.state.squares.slice();
    // verificando se já existe um vencedor, se houver a função termina aqui ignorando qualquer novo click
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // verificando o valor do boolean para saber qual jogador fará a próxima jogada
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares: squares,
      // setando o state da rodada
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        // definindo o valor do square a partir do seu state
        value={this.state.squares[i]}
        // atualizando o state do tabuleiro quando cada quadrado for clicado
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    // verificando se há um vencedor
    if (winner) {
      status = `Winner: ${winner}`;
      // caso nã haja verificando qual joador fará a próxima jogada
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

// Declarando o vencedor do jogo
function calculateWinner(squares) {
  // possibilidades de vitoria
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

  // dado um array de 9 posições vamos verificar se há um vencedor, caso não acha o valor null será retornado

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
