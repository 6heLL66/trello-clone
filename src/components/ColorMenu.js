import { Row } from 'react-bootstrap'

function ColorMenu({ changeColor }) {
  return (
    <Row className="colors">
      <div className="color-box col-1" onClick={(e) => changeColor(e, 'pink')}>
        <div className="color pink"></div>
      </div>
      <div className="color-box col-1" onClick={(e) => changeColor(e, 'blue')}>
        <div className="color blue"></div>
      </div>
      <div
        className="color-box col-1"
        onClick={(e) => changeColor(e, 'yellow')}
      >
        <div className="color yellow"></div>
      </div>
    </Row>
  )
}

export default ColorMenu
