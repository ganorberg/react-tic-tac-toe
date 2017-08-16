import React, { Component } from 'react'
import Row from './Row.jsx'
import StartButton from './StartButton.jsx'

export default class App extends Component {
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

    this.checkWin = this.checkWin.bind(this),
    this.flashWin = this.flashWin.bind(this)
    this.flip = this.flip.bind(this),
    this.newGame = this.newGame.bind(this),
    
    // counter used to alternate X and O as well as determine draw
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

  checkWin(row, column, lastLetter) {
    // Check row and column last move resides in
    for (let testColumn = 0; testColumn < 3; testColumn += 1) {
      if (this.state.board[row][testColumn] !== lastLetter) break;
      if (testColumn === 2) {
        this.flashWin(lastLetter);
        return;
      }
    }
    
    for (let testRow = 0; testRow < 3; testRow += 1) {
      if (this.state.board[testRow][column] !== lastLetter) break;
      if (testRow === 2) {
        this.flashWin(lastLetter);
        return;
      }
    }

    // Diagonal check
    const topLeft = this.state.board[0][0];
    const topRight = this.state.board[0][2];
    const middle = this.state.board[1][1];
    const bottomLeft = this.state.board[2][0];
    const bottomRight = this.state.board[2][2];

    if (topLeft === lastLetter &&
        middle === lastLetter &&
        bottomRight === lastLetter
        ||
        topRight === lastLetter &&
        middle === lastLetter &&
        bottomLeft === lastLetter) {
      this.flashWin(lastLetter);
      return;
    }

    if (this.counter > 8) { this.flashWin('DRAW'); }
  }

  flashWin(win) {
    const draw = {
      board: [[win, win, win],
              [win, win, win],
              [win, win, win]],
      style: {fontSize: 50 + 'px'}
    }

    const winner = {
      board: [[win, win, win],
              ['W', 'I', 'N'],
              [win, win, win]]
    }

    if (win === 'DRAW') { this.setState(draw); }
    else { this.setState(winner); }
  }

  flip(row, column) {
    if (this.state.board[row][column] !== '-') { return; }
   
    const letter = this.counter % 2 ? 'X' : 'O';
    this.counter++;

    // Clone board to avoid mutating state directly
    const newBoard = Object.assign({}, this.state.board);
    newBoard[row][column] = letter;

    // Trigger callback to check win conditions every time board is updated
    this.setState({ board: newBoard }, () => this.checkWin(row, column, letter));
  }

  render() {
    const rows = [];
    for (let row = 0; row < 3; row++) {
      rows.push(<Row
        board={this.state.board}
        boxStyle={this.state.style}
        flip={this.flip}
        row={row}
        key={row}
      />);
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
