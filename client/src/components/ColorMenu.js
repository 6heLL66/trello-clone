import { Row } from 'react-bootstrap'
import { colorNames } from '../constants/colors'

function ColorMenu({ changeColor, blocked }) {
  const click = (e, color) => {
    if (!blocked) {
      changeColor(e, color)
    } else e.stopPropagation()
  }

  return (
    <Row className="colors">
      <div
        className={`color-box col-1 ${blocked && 'disabled'}`}
        onClick={(e) => click(e, colorNames.pink)}
      >
        <div className={`color ${colorNames.pink}`} />
      </div>
      <div
        className={`color-box col-1 ${blocked && 'disabled'}`}
        onClick={(e) => click(e, colorNames.blue)}
      >
        <div className={`color ${colorNames.blue}`} />
      </div>
      <div
        className={`color-box col-1 ${blocked && 'disabled'}`}
        onClick={(e) => click(e, colorNames.yellow)}
      >
        <div className={`color ${colorNames.yellow}`} />
      </div>
    </Row>
  )
}

export default ColorMenu
