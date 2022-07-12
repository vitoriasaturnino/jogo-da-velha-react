import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// Square como componente de função (recebe props como entrada e retorna o que deve ser renderizado)
function Square(props) {
  return (
    <button className="square" onClick={props.onclick}>
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
    };
  }

  // funcção que fara a manipulação do event do square que for clicado
  handleClick(i) {
    // a função slice() cria uma cópia do array a cada state modificado
    const squares = this.state.squares.slice();
    squares[i] = "X";
    this.setState({ squares: squares });
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
    const status = "Next player: X";

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
