// @flow

import React, { Component } from 'react'
import Row from './Row.jsx'
import StartButton from './StartButton.jsx'

type State = {
  board: Array<Array<string>>,
  style: { outline?: string, fontSize: string }
}

export default class App extends Component<void, State> {

  // allow contravariant use of covariant properties
  checkWin: (number, number, string) => void;
  flashWin: (string) => void;
  flip: (number, number) => void;
  newGame: () => void;
  counter: number;

  constructor() {
    super();
    this.state = {
      board: [['-', '-', '-'],
              ['-', '-', '-'],
              ['-', '-', '-']],
      style: {
              outline: "none",
              fontSize: `${72}px`
      },
    }

    this.checkWin = this.checkWin.bind(this),
    this.flashWin = this.flashWin.bind(this)
    this.flip = this.flip.bind(this),
    this.newGame = this.newGame.bind(this),
    
    // alternate X and O, and determine draw
    this.counter = 0;
  }

  newGame(): void {
    this.setState({
      board: [['-', '-', '-'],
              ['-', '-', '-'],
              ['-', '-', '-']],
      style: { fontSize: `${72}px` }
    });
    
    this.counter = 0;
  }

  checkWin(row: number, column: number, lastLetter: string): void {
    // check every box in the given row to see if they all match the letter selected
    for (let testColumn = 0; testColumn < 3; testColumn += 1) {
      if (this.state.board[row][testColumn] !== lastLetter) break;
      if (testColumn === 2) {
        this.flashWin(lastLetter);
        return;
      }
    }
    
    // check every box in the given column to see if they all match the letter selected
    for (let testRow = 0; testRow < 3; testRow++) {
      if (this.state.board[testRow][column] !== lastLetter) break;
      if (testRow === 2) {
        this.flashWin(lastLetter);
        return;
      }
    }

    // check diagonals
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

  flashWin(win: string): void {
    const draw = {
      board: [[win, win, win],
              [win, win, win],
              [win, win, win]],
      style: {fontSize: 32 + 'px'}
    }

    const winner = {
      board: [[win, win, win],
              ['W', 'I', 'N'],
              [win, win, win]]
    }

    if (win === 'DRAW') { this.setState(draw); }
    else { this.setState(winner); }
  }

  flip(row: number, column: number): void {
    if (this.state.board[row][column] !== '-') { return; }
   
    const letter = this.counter % 2 === 0 ? 'X' : 'O';
    this.counter++;

    // Clone board to avoid mutating state directly
    const newBoard = JSON.parse(JSON.stringify(this.state.board));
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
