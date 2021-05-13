import { Row } from 'react-bootstrap'
import { useCallback } from 'react'

import * as colorValues from '../constants/colors'

function ColorMenu({ changeColor, blocked, colors }) {
  const click = useCallback(
    (e, color) => {
      if (!blocked) {
        changeColor(e, color)
      } else {
        e.stopPropagation()
      }
    },
    [changeColor, blocked]
  )

  return (
    <Row className="colors">
      {colors &&
        colors.map((color, i) => {
          return (
            <div
              key={i}
              className={`color-box col-1 ${blocked && 'disabled'}`}
              onClick={(e) => click(e, color)}
            >
              <div
                className={`color`}
                style={{ background: colorValues.colors[color] }}
              />
            </div>
          )
        })}
    </Row>
  )
}

export default ColorMenu
