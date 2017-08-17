// @flow

import React from 'react'

type Props = {
  board: Array<Array<string>>,
  boxStyle: { outline?: string, fontSize: string },
  coords: string,
  flip: (number, number) => void
}

export default function Box({ board, boxStyle, coords, flip }: Props) {
  const row = Number(coords[0]);
  const column = Number(coords[2]);

  return (
    // Flip updates board state in App component
    <button className="box" style={boxStyle} onClick={() => flip(row, column)}>
      {board[row][column]}
    </button>
  )
}
