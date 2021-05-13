import * as Icon from 'react-bootstrap-icons'
import { Row } from 'react-bootstrap'
import { useCallback, useEffect, useMemo, useState } from 'react'
import ReactLoading from 'react-loading'

import ColorMenu from './ColorMenu'
import { colorNames, colors } from '../constants/colors'
import {
  animStep,
  animInterval,
  animTypes,
  loadingColor,
  loadingSizes, animBorder
} from '../constants/values'

function BoardButton({
  board,
  crossClick,
  onClick,
  colorClick,
  loading,
  blocked
}) {
  const [opacity, setOpacity] = useState(0)
  const [timeIndex, setTimeIndex] = useState(null)

  const usableColors = useMemo(() => {
    return Object.keys(colorNames)
  }, [])

  useEffect(() => {
    return () => {
      if (timeIndex) {
        clearTimeout(timeIndex)
      }
    }
  }, [timeIndex])

  const crossHandler = useCallback(
    (e) => {
      e.stopPropagation()
      crossClick(board.id)
    },
    [board, crossClick]
  )

  const colorChangeHandler = useCallback(
    (e, color) => {
      e.stopPropagation()
      colorClick({ ...board, color })
    },
    [board, colorClick]
  )

  const boardClickHandler = useCallback(() => {
    onClick(board)
  }, [board, onClick])

  const animate = useCallback(
    (value, diff) => {
      value += diff
      if (value > animBorder.low && value < animBorder.high) {
        setOpacity(value)
        setTimeIndex(setTimeout(animate, animInterval, value, diff))
      }
    },
    [setOpacity, setTimeIndex]
  )

  const startAnimation = useCallback(
    (type) => {
      if (timeIndex) {
        clearTimeout(timeIndex)
      }
      setTimeIndex(
        setTimeout(
          animate,
          animInterval,
          opacity,
          type === animTypes.show ? animStep : -animStep
        )
      )
    },
    [timeIndex, setTimeIndex, opacity, animate]
  )

  return (
    <div
      className="board-button"
      style={{ background: colors[board.color] }}
      onClick={boardClickHandler}
      onMouseOver={() => startAnimation(animTypes.show)}
      onMouseOut={() => startAnimation(animTypes.hide)}
    >
      <Row
        className="w-100 justify-content-between"
        style={{ opacity: opacity }}
      >
        <ColorMenu
          changeColor={colorChangeHandler}
          blocked={board.id === blocked}
          colors={usableColors}
        />
        {loading !== board.id ? (
          <Icon.X onClick={crossHandler} />
        ) : (
          <ReactLoading
            type="spin"
            className="mr-2 mb-2"
            color={loadingColor}
            height={loadingSizes.small}
            width={loadingSizes.small}
          />
        )}
      </Row>
      <Row className="m-auto">{board.name}</Row>
    </div>
  )
}

export default BoardButton
