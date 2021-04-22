import { Toast } from 'react-bootstrap'
import { colors } from '../constants/alerts'

function Alert({ message, type, clearAlert }) {
  return (
    <Toast
      style={{ background: colors[type] }}
      className="alert"
      onClose={clearAlert}
      show={true}
      delay={4000}
      autohide
    >
      <Toast.Header>
        <strong className="mr-auto">{type}</strong>
        <small>just now</small>
      </Toast.Header>
      <Toast.Body className="alert-message">{message}</Toast.Body>
    </Toast>
  )
}

export default Alert
