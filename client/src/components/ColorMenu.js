import { Row } from 'react-bootstrap'

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
        onClick={(e) => click(e, 'pink')}
      >
        <div className="color pink" />
      </div>
      <div
        className={`color-box col-1 ${blocked && 'disabled'}`}
        onClick={(e) => click(e, 'blue')}
      >
        <div className="color blue" />
      </div>
      <div
        className={`color-box col-1 ${blocked && 'disabled'}`}
        onClick={(e) => click(e, 'yellow')}
      >
        <div className="color yellow" />
      </div>
    </Row>
  )
}

export default ColorMenu
