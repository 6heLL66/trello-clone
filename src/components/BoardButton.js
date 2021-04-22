import * as Icon from 'react-bootstrap-icons'
import { Row } from 'react-bootstrap'
import ColorMenu from './ColorMenu'
import { useState } from 'react'
import { colors } from '../constants/colors'

function BoardButton({ board, crossClick, onClick, colorClick }) {
  const [opacity, setOpacity] = useState(0)
  const [timeIndex, setTimeIndex] = useState(null)

  const crossHandler = (e) => {
    e.stopPropagation()
    crossClick(board.id)
  }

  const colorChangeHandler = (e, color) => {
    e.stopPropagation()
    colorClick({ ...board, color })
  }

  const boardClickHandler = () => {
    onClick(board)
  }

  const animate = (opacity, diff) => {
    let value = opacity + diff
    if (value < 0 || value > 1) {
      return
    }
    setOpacity(opacity + diff)
    setTimeIndex(setTimeout(animate, 20, value, diff))
  }

  const startAnimation = (type) => {
    if (timeIndex) clearTimeout(timeIndex)
    setTimeIndex(setTimeout(animate, 20, opacity, type === 'show' ? 0.1 : -0.1))
  }

  return (
    <div
      className="board-button"
      style={{ background: colors[board.color] }}
      onClick={boardClickHandler}
      onMouseOver={() => startAnimation('show')}
      onMouseOut={() => startAnimation('hide')}
    >
      <Row
        className="w-100 justify-content-between"
        style={{ opacity: opacity }}
      >
        <ColorMenu changeColor={colorChangeHandler} />
        <Icon.X onClick={crossHandler} />
      </Row>
      <Row className="m-auto">{board.name}</Row>
    </div>
  )
}

export default BoardButton
