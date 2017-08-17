// @flow

import React from 'react'

type Props = {
  newGame: () => void
}

export default function StartButton({ newGame }: Props) {
  return (
    <button id="startButton" onClick={newGame}>New Game</button>
  )
}
