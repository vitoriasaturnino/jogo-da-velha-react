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
  renderSquare(i) {
    return (
      // props recebida do component Game
      <Square
        // definindo o valor do square a partir do seu state
        value={this.props.squares[i]}
        // atualizando o state do tabuleiro quando cada quadrado for clicado
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
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
  // state de cada square estará no component Game, isso dá ao component game total controle sobre os dados do board e permite que instrua o board a reenderizar turnos anteriores através o history
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      // stepNumber reflete ao reflete a jogada mostrada ao usuário nesse momento.
      stepNumber: 0,
      // definindo o X como primeiro jogador (sempre que um jogador fizer uma jogada o valor da variavel será trocado determinando asssim de quem é a vez, X ou O e o state do jogo é salvo)
      xIsNext: true,
    };
  }

  // funcção que fara a manipulação do event do square que for clicado
  handleClick(i) {
    // o history definido abaixo certifica que mesmo que uma viagem seja feita para uma jogada anterior e a partir deste ponto uma nova jogada seja feita, todo o "futuro" que já existia seja descartado
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // renderiza apenas a jogada selecionada atualmente de acordo com o stepNumber
    const current = history[history.length - 1];
    // a função slice() cria uma cópia do array a cada state modificado
    const squares = current.squares.slice();
    // verificando se já existe um vencedor, se houver a função termina aqui ignorando qualquer novo click
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // verificando o valor do boolean para saber qual jogador fará a próxima jogada
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      // atualizando o stepNumber para exibir as jogadas de acordo com que elas são feitas
      stepNumber: history.length,
      // setando o state da rodada
      xIsNext: !this.state.xIsNext,
    });
  }

  // definindo o método to jump que viaja entre as jogadas já feitas de acordo com o step
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  // A função utilizara a última entrada do history spara determinar e exibir o status do jogo
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // mapeando o historico de jogadas
    // a variavel step quarda o tamanho do elemento history e move se refere ao indice do elemento history
    const moves = history.map((step, move) => {
      const desc = move ? `Go to move # ${move}` : "Go to game start";
      return (
        // definindo a chave de cada item da lista utilizando o index da jogada
        <li key={move}>
          {/* a função jumpTo faz a viagem no tempo para a jogada referenciada pelo indice */}
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    // verificando se há um vencedor
    if (winner) {
      status = `Winner: ${winner}`;
      // caso nã haja verificando qual joador fará a próxima jogada
    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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
