// @flow

import React from 'react'
import Box from './Box.jsx'

type Props = {
  board: Array<Array<string>>,
  boxStyle: { outline?: string, fontSize: string },
  row: number,
  flip: (number, number) => void;
}

export default function Row({ board, boxStyle, row, flip }: Props) {
    let boxes = [];
    for (let column = 0; column < 3; column++) {
      boxes.push(
        <Box
          board={board}
          boxStyle={boxStyle}
          coords={row + ',' + column}
          key={row + ',' + column}
          flip={flip}
        />
      );
    }

    return (
      <div className="row">
        { boxes }
      </div>
    )
}
