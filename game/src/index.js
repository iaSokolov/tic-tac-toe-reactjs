import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) { 
  return (<button className="square" onClick={ props.onClick }>          
      { props.value }
    </button>); 
}

class Board extends React.Component {
  constructor(props){ 
    super(props);
    this.state = {
      squareItem: Array(9).fill(null), 
      isPlayerCurrent: true, 
      winner: null 
    };
  }

  calcWinner(squareItem) {
    let ret = null; 
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
      if (squareItem[a] && 
          squareItem[a] === squareItem[b] && 
          squareItem[a] === squareItem[c]) {        
        ret = squareItem[a];
        break; 
      }
    }

    return ret;
  }

  changeSquareItem(i) { 
    if (!this.state.winner) {       
      let localSquareItem = this.state.squareItem.slice();       
      localSquareItem[i] = this.state.isPlayerCurrent ? 'X' : 'O';                 
      this.setState( {squareItem : localSquareItem, isPlayerCurrent: !this.state.isPlayerCurrent, winner: this.calcWinner(localSquareItem) });      
    }
  }

  renderSquare(i) {
    return <Square value={this.state.squareItem[i]} onClick={() => this.changeSquareItem(i)}/>;
  }

  render() {        
    let status = ""; 

    if (this.state.winner) {
      status = 'Winner: ' + this.state.winner;
    } else  {
      status = 'Next player: ' + (this.state.isPlayerCurrent ? 'X' : 'O');
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

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);