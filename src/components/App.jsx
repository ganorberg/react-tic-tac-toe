import React, { Component } from 'react'
import Row from './Row.jsx'
import StartButton from './StartButton.jsx'

class App extends Component {
  constructor() {
    super();
    this.state = {
      board: [['-', '-', '-'],
              ['-', '-', '-'],
              ['-', '-', '-']],
      style: {
        outline: "none",
        fontSize: `${100}px`
      },
    }

    this.flip = this.flip.bind(this),
    this.newGame = this.newGame.bind(this),
    this.checkWin = this.checkWin.bind(this),
    this.flashWin = this.flashWin.bind(this)
    this.counter = 0;
  }

  newGame() {
    this.setState({
      board: [['-', '-', '-'],
              ['-', '-', '-'],
              ['-', '-', '-']],
      style: { fontSize: `${100}px` }
    });
    
    this.counter = 0;
  }

  checkWin(row, column, lastMove) {
    let middle = this.state.board[1][1];

    // Check row and column last move resides in
    for (let i = 0; i < 3; i += 1) {
      if (this.state.board[row][i] !== lastMove) break;
      if (i == 2) return this.flashWin(lastMove);
    }
    
    for (let i = 0; i < 3; i += 1) {
      if (this.state.board[i][column] !== lastMove) break;
      if (i == 2) return this.flashWin(lastMove);
    }

    // Diagonal check. 
    
    if (this.counter > 8) this.flashWin('DRAW');
  }

  flashWin(win) {
    if (win === 'DRAW') {
      this.setState(
        {board: [[win, win, win],
                 [win, win, win],
                 [win, win, win]],
         style: {fontSize: 50 + 'px'}
        }
      );
    } else {
      this.setState(
        {board: [[win, win, win],
                 ['W', 'I', 'N'],
                 [win, win, win]]
        }
      );
    }
  }

  flip(row, column) {
    if (this.state.board[row][column] === '-') {
      let toChange;
      this.counter % 2 ? toChange = 'X' : toChange = 'O'
      this.counter += 1;

      // Deep clone board to mutate values on clone. Then set state to mutated clone.
      let newBoard = JSON.parse(JSON.stringify(this.state.board));
      newBoard[row][column] = toChange;
      this.setState({board: newBoard}, this.checkWin.bind(this, row, column, toChange));
    }
  }

  render() {
    let rows = [];
    for (let i = 0; i < 3; i += 1) {
      rows[i] = <Row board={this.state.board} boxStyle={this.state.style} row={i} key={i} flip={this.flip} />
    }
    
    return (
      <div>
        <h1 id="title">Tic Tac Toe</h1>
        <div id="board">
          { rows }
        </div>
        <StartButton newGame={this.newGame}/>
      </div>
    )
  }
}

export default App