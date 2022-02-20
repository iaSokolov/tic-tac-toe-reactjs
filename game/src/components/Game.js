import React from 'react';
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {            
            history: [{ winner: null, currentPlayer: 'X', square: Array(9).fill(null) }]
        };
    }

    onGoToStepHandler(step) {
        this.setState({ history: this.state.history.slice(0, step + 1) });
    }

    changeSquareItem(i) {        
        if (!this.state.history[this.state.history.length - 1].winner) {            
            let currentState = this.state.history[this.state.history.length - 1];
            let newState = {
                square: currentState.square.slice(), 
                winner: null, 
                currentPlayer: currentState.currentPlayer === 'X' ? 'O' : 'X'
            };  
            newState.square[i] = currentState.currentPlayer; 
            newState.winner = this.calcWinner(newState.square);
            this.setState({                
                history: this.state.history.concat([newState])
            });
        }
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

    render() {        
        let currentState = this.state.history[this.state.history.length - 1]; 

        return (
            <div className="game">
                <div className="game-board">
                    <Board squareItem={currentState.square.slice()}
                        onChangeStatus={(newStatus) => this.onChangeStatusHandler(newStatus)}
                        onChangeItem={(item) => this.changeSquareItem(item)} />
                </div>
                <div className="game-info">
                    <div>{currentState.winner ? ('Winner: ' + currentState.winner) : ('Player: ' + currentState.currentPlayer)}</div>
                    <ol>{this.state.history.map((state, index) => { return { text: index ? ('Step ' + index) : 'Start the Game', state: state } })
                        .map((value, index) => (<li key={index}><button onClick={() => this.onGoToStepHandler(index)}>{value.text}</button>{value.state.square}</li>))}</ol>
                </div>
            </div>
        );
    }
}

export default Game; 