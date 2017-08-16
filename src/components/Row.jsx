import React from 'react'
import Box from './Box.jsx'

export default function Row({ board, boxStyle, row, flip }) {
    let boxes = [];
    for (let column = 0; column < 3; column++) {
      boxes.push(
        <Box
          board={board}
          boxStyle={boxStyle}

          // box prop stores row and column info for boxes to update state
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
