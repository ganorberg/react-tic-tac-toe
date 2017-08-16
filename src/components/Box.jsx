import React from 'react'

export default function Box({ board, boxStyle, coords, flip }) {
  const row = coords[0];
  const column = coords[2];

  return (
    // Flip updates board state in App component
    <button className="box" style={boxStyle} onClick={() => flip(row, column)}>
      {board[row][column]}
    </button>
  )
}
