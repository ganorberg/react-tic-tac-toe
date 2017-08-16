import React from 'react'

export default function StartButton({ newGame }) {
  return (
    <button id="startButton" onClick={newGame}>New Game</button>
  )
}
